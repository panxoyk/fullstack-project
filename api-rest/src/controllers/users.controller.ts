import bcrypt from "bcrypt"
import { NextFunction, Request, Response } from "express"
import UserModel from "../models/user.model"
import { createSession, createToken } from "../utils"

export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await UserModel.find({})
        res.status(200).json(users)

    } catch (error) {
        next(error)
    }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const user = await UserModel.findOne({ _id: id })
        user
            ? res.status(200).json(user)
            : next({ status: 404, message: "User not found" })

    } catch (error) {
        next(error)
    }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req
        const { password } = body
        const passwordHash = await bcrypt.hash(password, 10)
        const data = { ...body, passwordHash }
        const user = await UserModel.create(data)
        res.status(201).json(user)

    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body, params } = req
        const { id } = params
        const { password } = body
        const passwordHash = await bcrypt.hash(password, 10)
        const data = { ...body, passwordHash }
        const user = await UserModel.findOneAndUpdate({ _id: id }, data, { new: true })
        user
            ? res.status(200).json(user)
            : next({ status: 404, message: "User not found" })

    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const user = await UserModel.findOneAndDelete({ _id: id })
        user
            ? res.status(200).json(user)
            : next({ status: 404, message: "User not found" })

    } catch (error) {
        next(error)
    }
}

export const signupUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req
        const { password } = body
        const passwordHash = await bcrypt.hash(password, 10)
        const data = { ...body, passwordHash }
        const user = await UserModel.create(data)
        const session = createSession(user.toJSON())
        const token = createToken(session)
        console.log("Welcome " + session.name)
        res.cookie("token", token, { httpOnly: true }).status(200).send(session)

    } catch (error) {
        next(error)
    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })
        if (user) {
            const validPassword = await bcrypt.compare(password, user.passwordHash)
            if (validPassword) {
                const session = createSession(user.toJSON())
                const token = createToken(session)
                console.log("Hi " + session.name)
                res.cookie("token", token, { httpOnly: true }).status(200).send(session)
            } else {
                next({ status: 401, message: "Invalid credentials" })
            }
        } else {
            next({ status: 404, message: "User not found" })
        }

    } catch (error) {
        next(error)
    }
}

export const logoutUser = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("See you soon!")
        res.clearCookie("token").status(200).end()

    } catch (error) {
        next(error)
    }
}
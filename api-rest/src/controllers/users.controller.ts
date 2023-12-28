import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"
import UserModel from "../models/user.model"
import { config } from "../config/config"

export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await UserModel.find({})
        res.status(200).send(users)

    } catch (error) {
        next(error)
    }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const user = await UserModel.findOne({ _id: id })
        user
            ? res.status(200).send(user)
            : next({ status: 404, message: "User not found" })

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
                const { _id, email, name } = user
                const session = { id: _id, email, name }
                const token = jwt.sign(session, config.secretKey, { expiresIn: "2d" })
                console.log("Bienvenido " + session.name)
                res.header("Auth", token).status(200).send(session)
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

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req
        const { password } = body
        const passwordHash = await bcrypt.hash(password, 10)
        const data = { ...body, passwordHash }
        const user = await UserModel.create(data)
        res.status(201).send(user)

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
            ? res.status(200).send(user)
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
            ? res.status(200).send(user)
            : next({ status: 404, message: "User not found" })

    } catch (error) {
        next(error)
    }
}
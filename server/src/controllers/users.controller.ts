import bcrypt from "bcrypt"
import { NextFunction, Request, Response } from "express"
import UserModel from "../models/user.model"

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
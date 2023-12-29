import bcrypt from "bcrypt"
import { Request, Response, NextFunction } from "express"
import { createSession, createToken } from "../utils"
import UserModel from "../models/user.model"

export const signup = async (req: Request, res: Response, next: NextFunction) => {
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

export const login = async (req: Request, res: Response, next: NextFunction) => {
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

export const logout = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("See you soon!")
        res.clearCookie("token").status(200).end()

    } catch (error) {
        next(error)
    }
}
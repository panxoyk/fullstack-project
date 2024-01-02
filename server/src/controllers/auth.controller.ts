import bcrypt from "bcrypt"
import { Request, Response, NextFunction } from "express"
import { createSession, createAccessToken, createRefreshToken, verifyRefreshToken } from "../utils"
import UserModel from "../models/user.model"
import { Session } from "../types"

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req
        const { password } = body
        const passwordHash = await bcrypt.hash(password, 10)
        const data = { ...body, passwordHash }
        const user = await UserModel.create(data)
        const session = createSession(user.toJSON())
        const accessToken = createAccessToken(session)
        const refreshToken = createRefreshToken(session)

        console.log("Welcome " + session.email)
        res.cookie("token", refreshToken, {
            httpOnly: true,
            maxAge: 2 * 7 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({ accessToken })

    } catch (error) {
        next(error)
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })
        const match = await bcrypt.compare(password, user?.passwordHash!!)
        if (!match) return next({ status: 401, message: "Invalid credentials" })

        const session = createSession(user?.toJSON()!!)
        const accessToken = createAccessToken(session)
        const refreshToken = createRefreshToken(session)

        console.log("Hi " + session.email)
        res.cookie("token", refreshToken, {
            httpOnly: true,
            maxAge: 2 * 7 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({ accessToken })

    } catch (error) {
        next(error)
    }
}

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { cookies } = req
        const refreshToken = cookies.token
        const userLogged = verifyRefreshToken(refreshToken) as Session
        const user = await UserModel.findOne({ email: userLogged.email })
        const session = createSession(user?.toJSON()!!)
        const accessToken = createAccessToken(session)

        console.log("Refreshed!")
        res.status(200).json({ accessToken })

    } catch (error: any) {
        next({ status: 401, message: "Refresh token" })
    }
}

export const logout = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("See you soon!")
        res.status(200).clearCookie("token").end()

    } catch (error) {
        next(error)
    }
}
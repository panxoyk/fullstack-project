import { config } from "../config"
import jwt from "jsonwebtoken"
import { Session, User } from "../types"

export const createAccessToken = (session: Session) => {
    return jwt.sign(session, config.accessTokenKey, { expiresIn: 5 })
}

export const createRefreshToken = (session: Session) => {
    return jwt.sign(session, config.refreshTokenKey, { expiresIn: "14d" })
}

export const verifyAccessToken = (accessToken: string) => {
    return jwt.verify(accessToken, config.refreshTokenKey)
}

export const verifyRefreshToken = (refreshToken: string) => {
    return jwt.verify(refreshToken, config.refreshTokenKey)
}

export const createSession = (user: User) => {
    const { id, email } = user
    return { id, email }
}
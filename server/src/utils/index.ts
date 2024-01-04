import config from "../config"
import jwt from "jsonwebtoken"
import { Session, User } from "../types"

const { accessToken, refreshToken } = config

export const createAccessToken = (session: Session) => {
    const { key, expiresIn } = accessToken
    return jwt.sign(session, key, { expiresIn })
}

export const createRefreshToken = (session: Session) => {
    const { expiresIn, key } = refreshToken
    return jwt.sign(session, key, { expiresIn })
}

export const verifyAccessToken = (token: string) => {
    const { key } = accessToken
    return jwt.verify(token, key)
}

export const verifyRefreshToken = (token: string) => {
    const { key } = refreshToken
    return jwt.verify(token, key)
}

export const createSession = (user: User) => {
    const { id, email } = user
    return { id, email }
}
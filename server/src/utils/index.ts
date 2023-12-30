import { config } from "../config"
import jwt from "jsonwebtoken"
import { Session, User } from "../types"

export const createAccessToken = (session: Session) => {
    return jwt.sign(session, config.accessTokenKey, { expiresIn: "10s" })
}

export const createRefreshToken = (session: Session) => {
    return jwt.sign(session, config.refreshTokenKey, { expiresIn: "14d" })
}

export const createSession = (user: User) => {
    const { id, email, name } = user
    return { id, email, name }
}
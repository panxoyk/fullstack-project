import { config } from "../config"
import jwt from "jsonwebtoken"
import { Session, User } from "../types"

export const createToken = (session: Session) => {
    return jwt.sign(session, config.secretKey, { expiresIn: "1m" })
}

export const createSession = (user: User) => {
    const { id, email, name } = user
    return { id, email, name }
}
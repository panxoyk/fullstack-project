import { HttpError } from "../types/types"
import { Request, Response, NextFunction } from "express"
import { AnyZodObject, ZodError } from "zod"
import { config } from "../config/config"
import jwt, { JsonWebTokenError } from "jsonwebtoken"

export const httpError = (err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
    console.log("Middleware HTTP error handling")
    const status = err.status || 500
    const message = err.message || "Internal server error"
    if (err instanceof ZodError) {
        const message = err.issues.map((issue) => issue.message)
        return res.status(400).send({ message })
    }
    if (err instanceof JsonWebTokenError) {
        const message = "Invalid token"
        return res.status(401).send({ message })
    }
    return res.status(status).send({ message })
}

export const notFound = (_req: Request, res: Response) => {
    console.log("Middleware Not found error")
    return res.status(404).send({ message: "Endpoint not found" })
}

export const validateUserSchema = (schema: AnyZodObject) =>
    (req: Request, _res: Response, next: NextFunction) => {
        try {
            const { body, params } = req
            schema.parse({ body, params })
            next()

        } catch (error) {
            next(error)
        }
    }

export const auth = (req: Request, _res: Response, next: NextFunction) => {
    try {
        const token = req.header("Auth")?.replace("Bearer ", "")
        if (token && jwt.verify(token, config.secretKey)) {
            next()
        } else {
            next({ status: 401, message: "Missing token" })
        }

    } catch (error) {
        next(error)
    }
}
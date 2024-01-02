import { HttpError } from "../types"
import { Request, Response, NextFunction } from "express"
import { AnyZodObject, ZodError } from "zod"
import jwt, { JsonWebTokenError } from "jsonwebtoken"
import { config } from "../config"

export const httpError = (err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || 500
    const message = err.message || "Internal server error"
    if (err instanceof ZodError) {
        console.log("Zod error", err.errors)
        const message = err.issues.map((issue) => issue.message)
        return res.status(400).send({ message })
    }
    if (err instanceof JsonWebTokenError) {
        console.log("Jsonwebtoken error", message)
        if (message ===  "jwt expired" || message ===  "jwt must be provided" || message === "invalid signature") {
            return res.status(401).send({ message: "Access token" })
        }
        return res.status(401).send({ message })
    }
    return res.status(status).send({ message })
}

export const notFound = (_req: Request, res: Response) => {
    console.log("Not found error")
    return res.status(404).send({ message: "Endpoint not found" })
}

export const validateSchema = (schema: AnyZodObject) =>
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
        const { auth } = req.headers
        jwt.verify(auth as string, config.accessTokenKey)
        next()

    } catch (error) {
        next(error)
    }
}
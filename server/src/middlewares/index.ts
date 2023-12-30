import { HttpError } from "../types"
import { Request, Response, NextFunction } from "express"
import { AnyZodObject, ZodError } from "zod"
import jwt from "jsonwebtoken"
import { config } from "../config"

export const httpError = (err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
    console.log("Middleware HTTP error handling")
    const status = err.status || 500
    const message = err.message || "Internal server error"
    if (err instanceof ZodError) {
        const message = err.issues.map((issue) => issue.message)
        return res.status(400).send({ message })
    }
    if (err instanceof jwt.JsonWebTokenError) {
        const message = err.message
        console.log(message)
        if (message === "jwt must be provided") return res.status(401).send({ message })
        return res.status(403).send({ message })
    }
    return res.status(status).send({ message })
}

export const notFound = (_req: Request, res: Response) => {
    console.log("Middleware Not found error")
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
        jwt.verify(auth as string, config.accessTokenKey) as jwt.JwtPayload
        next()

    } catch (error) {
        next(error)
    }
}
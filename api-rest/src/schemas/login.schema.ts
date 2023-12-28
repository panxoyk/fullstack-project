import { z } from "zod"

const EmailSchema = z
    .string({ required_error: "Email is required" })

const PasswordSchema = z
    .string({ required_error: "Password is required" })

const LoginSchema = z.object({
    email: EmailSchema,
    password: PasswordSchema,
})

export const LoginUserSchema = z.object({
    body: LoginSchema
})
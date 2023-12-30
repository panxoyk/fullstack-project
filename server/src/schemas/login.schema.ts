import { z } from "zod"

const EmailSchema = z
    .string({ required_error: "Email is required" })

const PasswordSchema = z
    .string({ required_error: "Password is required" })

export const LoginSchema = z.object({
    body: z.object({
        email: EmailSchema,
        password: PasswordSchema,
    })
})
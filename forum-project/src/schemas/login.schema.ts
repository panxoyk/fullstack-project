import * as z from "zod"

const EmailSchema = z
    .string()
    .min(1, "An email is required")
    .email()

const PasswordSchema = z
    .string()
    .min(1, "A password is required")

export const LoginSchema = z.object({
    email: EmailSchema,
    password: PasswordSchema
})
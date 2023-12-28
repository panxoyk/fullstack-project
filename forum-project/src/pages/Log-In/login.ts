import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const EmailSchema = z
    .string()
    .min(1, "An email is required")
    .email()

const PasswordSchema = z
    .string()
    .min(1, "A password is required")

const FormSchema = z.object({
    email: EmailSchema,
    password: PasswordSchema
})

export type LoginValues = z.infer<typeof FormSchema>

export const resolver = zodResolver(FormSchema)
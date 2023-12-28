import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const NameSchema = z
    .string()
    .min(1, "A name is required")

const EmailSchema = z
    .string()
    .min(1, "An email is required")
    .email()

const PasswordSchema = z
    .string()
    .min(1, "A password is required")
    .min(6, "Password must contain at least 6 character(s)")

const PasswordConfirmSchema = z
    .string()
    .min(1, "A password confirm is required")

const BirthSchema = z
    .date({
        required_error: "A date of birth is required.",
    })

const GenderSchema = z
    .enum(["male", "female", "other"], { required_error: "A gender is required" })

const FormSchema = z.object({
    name: NameSchema,
    email: EmailSchema,
    password: PasswordSchema,
    passwordConfirm: PasswordConfirmSchema,
    birth: BirthSchema,
    gender: GenderSchema
}).refine((data) => { return data.password === data.passwordConfirm }, {
    path: ["passwordConfirm"],
    message: "Passwords do not match"
})

export type SignupValues = z.infer<typeof FormSchema>

export const resolver = zodResolver(FormSchema)
import { z } from "zod"
import { Gender } from "../types/types"

const dateFormat = /^(0?[1-9]|[12][0-9]|3[01])\-(0?[1-9]|1[012])\-(19|20)\d\d$/

const NameSchema = z
    .string({ required_error: "Name is required" })
    .min(1, "Name must contain at least 1 character(s)")

const EmailSchema = z
    .string({ required_error: "Email is required" })
    .email()

const PasswordSchema = z
    .string({ required_error: "Password is required" })
    .min(6, "Password must contain at least 6 character(s)")

const GenderSchema = z
    .nativeEnum(Gender, { required_error: "Gender is required" })

const BirthSchema = z
    .string({ required_error: "Birth is required" })
    .min(1, "Birth must contain at least 1 character(s)")
    .regex(dateFormat, "Invalid date format DD-MM-YYYY")

const UserSchema = z.object({
    name: NameSchema,
    email: EmailSchema,
    password: PasswordSchema,
    gender: GenderSchema,
    birth: BirthSchema,
})

export const CreateUserSchema = z.object({
    body: UserSchema
})

export const UpdateUserSchema = z.object({
    body: UserSchema.partial()
})
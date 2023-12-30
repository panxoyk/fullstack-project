import zod from "zod"
import { LoginSchema } from "@/schemas/login.schema"
import { SignupSchema } from "@/schemas/signup.schema"

export type LoginValues = zod.infer<typeof LoginSchema>

export type SignupValues = zod.infer<typeof SignupSchema>

export interface Session {
    id: string,
    name: string,
    email: string,
}
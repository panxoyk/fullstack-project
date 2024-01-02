import zod from "zod"
import { LoginSchema } from "@/schemas/login.schema"
import { SignupSchema } from "@/schemas/signup.schema"

export type LoginValues = zod.infer<typeof LoginSchema>

export type SignupValues = zod.infer<typeof SignupSchema>

export type AccessTokenResponse = {
    data: {
        accessToken: string
    }
}

export type Session = {
    id: string,
    email: string
}

export type User = {
    id: string,
    email: string,
    name: string
}
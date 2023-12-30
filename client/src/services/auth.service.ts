import api from "@/api/auth.api"
import { LoginValues, SignupValues } from "@/types"
import { formatDate } from "@/utils/lib"
import { isAxiosError } from "axios"

export const login = async (values: LoginValues) => {
    try {
        const { data } = await api.post("/login", values)
        return data
    } catch (error: any) {
        if (isAxiosError(error)) console.log(error?.response)
        return
    }
}

export const refresh = async () => {
    try {
        const { data } = await api.get("/refresh")
        return data
    } catch (error: any) {
        if (isAxiosError(error)) console.log(error?.response)
        return
    }
}

export const logout = async (auth: string) => {
    try {
        const headers = { auth }
        return await api.post("/logout", null, { headers })
    } catch (error: any) {
        if (isAxiosError(error)) console.log(error?.response)
        return
    }
}

export const signup = async (values: SignupValues) => {
    try {
        const signup = { ...values, birth: formatDate(values.birth) }
        const { data } = await api.post("/signup", signup)
        return data
    } catch (error: any) {
        if (isAxiosError(error)) console.log(error?.response)
        return
    }
}
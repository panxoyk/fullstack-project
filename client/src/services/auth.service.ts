import api from "@/api"
import { AccessTokenResponse, LoginValues, SignupValues } from "@/types"
import { formatDate } from "@/utils/lib"

export const signup = async (values: SignupValues) => {
    try {
        const signup = { ...values, birth: formatDate(values.birth) }
        const response: AccessTokenResponse = await api.post("/auth/signup", signup)
        return response.data
    } catch (error: any) {
        throw new Error(error)
    }
}

export const login = async (values: LoginValues) => {
    try {
        const { data }: AccessTokenResponse = await api.post("/auth/login", values)
        return data
    } catch (error: any) {
        throw new Error(error)
    }
}

export const refresh = async () => {
    try {
        const { data }: AccessTokenResponse = await api.get("/auth/refresh")
        return data
    } catch (error: any) {
        throw new Error(error)
    }
}

export const logout = async () => {
    try {
        await api.post("/auth/logout")
    } catch (error: any) {
        throw new Error(error)
    }
}
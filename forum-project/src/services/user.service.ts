import { LoginValues } from "@/pages/Log-In/login"
import api from "@/api"
import { SignupValues } from "@/pages/Sign-Up/signup"
import { formatDate } from "@/lib/utils"

export const login = async (login: LoginValues) => {
    try {
        const { data } = await api.post("/login", login)
        return data
    } catch (error) {
        throw error
    }
}

export const logout = async () => {
    try {
        return await api.post("/logout")
    } catch (error) {
        throw error
    }
}

export const signup = async (values: SignupValues) => {
    try {
        const signup = { ...values, birth: formatDate(values.birth) }
        const { data } = await api.post("/signup", signup)
        return data
    } catch (error) {
        throw error
    }
}
import api from "@/api"
import { LoginValues, SignupValues } from "@/types"
import { formatDate } from "@/utils/lib"

export const login = async (values: LoginValues) => {
    try {
        const { data } = await api.post("/login", values)
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
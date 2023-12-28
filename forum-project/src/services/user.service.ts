import { LoginValues } from "@/pages/Log-In/login"
import api from "@/api"

export const loginUser = async (login: LoginValues) => {
    try {
        const { data } = await api.post("/login", login)
        return data
    } catch (error) {
        throw error
    }
}
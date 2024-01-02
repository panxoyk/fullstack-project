import api from "@/api"
import { setAuthHeaders } from "@/utils/headers"
import { getTokenItem } from "@/utils/item/token"

export const getAllUsers = async () => {
    try {
        setAuthHeaders(getTokenItem()!!)
        const { data } = await api.get("users")
        return data
    } catch (error: any) {
        throw new Error(error)
    }
}
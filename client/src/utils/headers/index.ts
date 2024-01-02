import api from "@/api"

export const setAuthHeaders = (accessToken: string) => {
    api.defaults.headers.common["auth"] = accessToken
}
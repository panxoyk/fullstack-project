import { removeTokenItem, setTokenItem } from "@/utils/item/token"
import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:80/api",
    withCredentials: true
})

api.interceptors.request.use(async (req) => req, (error) => {
    console.log("REQUEST ERROR", error.request)
    return Promise.reject(error)
})

api.interceptors.response.use((res) => res, async (error) => {
    console.log("RESPONSE ERROR", error.response)
    const errorMsg = error.response.data.message
    switch(errorMsg) {
        case "Refresh token": {
            await api.post("/auth/logout")
            removeTokenItem()
            location.reload()
            break
        }
        case "Access token": {
            const { data } = await api.get("/auth/refresh")
            setTokenItem(data.accessToken)
            error.config.headers = {
                ...error.config.headers,
                auth: data.accessToken
            }
            return api(error.config)
        }
        default: {
            break
        }
    }
    return error
})

export default api
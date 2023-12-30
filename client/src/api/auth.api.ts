import axios from "axios"

const authApi = axios.create({
    baseURL: "http://localhost:80/api/auth",
    withCredentials: true
})

export default authApi
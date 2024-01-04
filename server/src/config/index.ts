import { config as dotenvConfig } from "dotenv"
import { Config } from "../types"

dotenvConfig()

const config: Config = {
    nodeEnv: String(process.env.NODE_ENV),
    port: Number(process.env.PORT),
    portOrigin: Number(process.env.PORT_ORIGIN),
    dbUri: `mongodb+srv://Francisco:${process.env.DB_PASSWORD}@cluster0.xqzrlqv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    accessToken: {
        key: String(process.env.ACCESS_TOKEN_KEY),
        expiresIn: String(process.env.ACCESS_TOKEN_EXPIRES),
    },
    refreshToken: {
        key: String(process.env.REFRESH_TOKEN_KEY),
        expiresIn: String(process.env.ACCESS_TOKEN_EXPIRES),
    },
}

export default config
import { config as dotenvConfig } from "dotenv"
import { Config } from "../types"

dotenvConfig()

export const config: Config = {
    nodeEnv: String(process.env.NODE_ENV),
    port: Number(process.env.PORT),
    portOrigin: Number(process.env.PORT_ORIGIN),
    dbUri: `mongodb+srv://Francisco:${process.env.DB_PASSWORD}@cluster0.xqzrlqv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    accessTokenKey: String(process.env.ACCESS_TOKEN_KEY),
    refreshTokenKey: String(process.env.REFRESH_TOKEN_KEY),
}
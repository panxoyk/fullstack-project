import { config as dotenvConfig } from "dotenv"
import { Config } from "../types"

dotenvConfig()

export const config: Config = {
    port: Number(process.env.PORT),
    dbUri: `mongodb+srv://Francisco:${process.env.DB_PASSWORD}@cluster0.xqzrlqv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    secretKey: String(process.env.SECRET_KEY)
}
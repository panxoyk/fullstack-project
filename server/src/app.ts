import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import router from "./routes/index"
import { notFound, httpError } from "./middlewares"
import { config } from "./config"

const app = express()

app.use(cors({
    origin: `http://localhost:${config.portOrigin}`,
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api", router)

app.use(notFound)
app.use(httpError)

export default app
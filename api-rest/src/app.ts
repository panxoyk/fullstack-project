import express from "express"
import cors from "cors"
import router from "./routes/index"
import { notFound, httpError } from "./middlewares/middlewares"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api", router)

app.use(notFound)
app.use(httpError)

export default app
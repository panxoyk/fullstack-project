import { config } from "./config/config"
import dbConnect from "./db/db"
import app from "./app"

const port = config.port || 80

app.listen(port, async () => {
    console.log(`Server running on http://localhost:${port}`)
    await dbConnect()
})

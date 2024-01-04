import config from "./config"
import dbConnect from "./db"
import app from "./app"

const { port } = config

app.listen(port, async () => {
    console.log(`Server running on http://localhost:${port}`)
    await dbConnect()
})

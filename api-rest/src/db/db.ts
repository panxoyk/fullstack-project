import { connect } from "mongoose"
import { config } from "../config/config"

const dbConnect = async () => {
    try {
        const uri = config.dbUri
        await connect(uri)

        console.log("Connected to database")
    } catch (error) {
        console.log("Could not connect to database")
        process.exit(1)
    }
}

export default dbConnect
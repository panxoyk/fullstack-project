import { connect } from "mongoose"
import config from "../config"

const dbConnect = async () => {
    const { dbUri } = config
    try {
        await connect(dbUri)

        console.log("Connected to database")
    } catch (error) {
        console.log("Could not connect to database")
        process.exit(1)
    }
}

export default dbConnect
import mongoose from "mongoose";

const database = async () => {
    try {
        const conn = await mongoose.connect(`mongodb://127.0.0.1:27017/mernAuth`)
        console.log(`Mongodb Connected : ${conn.connection.host} `)
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default database
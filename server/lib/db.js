import mongoose from "mongoose";




export const connectDB = async () => {

    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`mongodb connected : ${conn.connection.host}`)
    } catch (error) {
        console.log(`error mongoDB connecting ${error}`)
        process.exit(1)
    }
}
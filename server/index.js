import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./lib/db.js"
import resumeRoute from "./routes/resume.route.js"

dotenv.config()

const app=express()
app.use(cors({
    origin:"",
    credentials:true
}))
app.use(express.json())

app.use('/uploads', express.static('uploads'));
app.use("/api/resume",resumeRoute)
let PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`server running at ${PORT}`)
    connectDB()
})
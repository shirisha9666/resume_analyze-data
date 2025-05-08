import express from "express"
import path from "path"
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./lib/db.js"
import resumeRoute from "./routes/resume.route.js"

dotenv.config()

const app=express()
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
app.use(express.json())
const __dirname=path.resolve()
// app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/resume",resumeRoute)


app.use(express.static(path.join(__dirname, '../frontend/build')));

app.all('/{*any}', (req, res) => {
  // res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

let PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`server running at ${PORT}`)
    connectDB()
})
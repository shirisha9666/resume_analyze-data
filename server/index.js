import path from "path"
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./lib/db.js"
import resumeRoute from "./routes/resume.route.js"



dotenv.config()

const app=express();
const allowedOrigins = [
  process.env.CLIENT_URL,
 process.env.DEPLOY_URL
];

app.use(cors({
   
   origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
    credentials:true
}))
app.use(express.json())
const __dirname=path.resolve()

app.use(express.static(path.join(__dirname,"/frontend/build")))

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"frontend","build","index.html"))
})



// above section
app.use("/api/resume",resumeRoute)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

let PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`server running at ${PORT}`)
    connectDB()
})
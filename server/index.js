import express from "express"
import path from "path"
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./lib/db.js"
import resumeRoute from "./routes/resume.route.js"
import { fileURLToPath } from 'url';

dotenv.config()

const app=express();
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
app.use(express.json())
// const __dirname=path.resolve()
// app.use('/uploads', express.static('uploads'));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const frontendPath = path.join(__dirname, '../frontend/build');
app.use(express.static(frontendPath));

app.get('*', (req, res) => {
     res.sendFile(path.join(frontendPath, 'index.html'));
});


// above section
app.use("/api/resume",resumeRoute)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

let PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`server running at ${PORT}`)
    connectDB()
})
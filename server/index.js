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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/resume",resumeRoute)


// app.use(express.static(path.join(__dirname, '../frontend/build')));

// app.all('/{*any}', (req, res) => {
 
//   res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
// });

// app.use(express.static(path.join(__dirname, '../public')));
// const pathToFrontend = path.join(__dirname, '../frontend/build');
const pathToFrontend = path.join(process.cwd(), 'frontend', 'build', 'index.html');
console.log("Frontend path during deployment:", pathToFrontend);
// app.use(express.static(pathToFrontend));
app.use(express.static(path.join(process.cwd(), 'frontend', 'build')));

app.all('*', (req, res) => {
    res.sendFile(pathToFrontend)
 
  //  res.sendFile(path.join(pathToFrontend, 'index.html'))
});

let PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`server running at ${PORT}`)
    connectDB()
})
import express from "express"
import {  uploadResume } from "../controller/resume.controller.js"
import multer from "multer"
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '..', 'uploads');


const router = express.Router()
const storage = multer.diskStorage({
    destination: (req, file, cd) => {

     
  cd(null, uploadsDir);
    },

    filename: (req, file, cd) => {
        cd(null, Date.now() + "-" + file.originalname)

    }
})

const upload = multer({ storage })

router.post("/upload", upload.fields([{ name: "resume", maxCount: 1 }]), uploadResume)




export default router
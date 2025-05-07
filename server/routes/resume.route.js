import express from "express"
import { analyzeResume, getresumeFile, uploadResume } from "../controller/resume.controller.js"
import multer from "multer"
import path from "path"



const router = express.Router()
const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, 'uploads/');
    },
    filename: (req, file, cd) => {
        cd(null, Date.now() + "-" + file.originalname)
    }
})
const upload = multer({ storage: storage })
router.post("/upload", upload.fields([{ name: "resume" }]), uploadResume)
// router.post("/upload",express.static("uploads"), uploadResume)
router.get("/", getresumeFile)
router.post("/analyze",analyzeResume)

export default router
import express from "express"
import { getresumeFile, uploadResume } from "../controller/resume.controller.js"
import multer from "multer"




const router = express.Router()
const storage = multer.diskStorage({
    destination: (req, file, cd) => {

        cd(null, 'uploads/');
    },
    filename: (req, file, cd) => {
        cd(null, Date.now() + "-" + file.originalname)

    }
})

const upload = multer({ storage })

router.post("/upload", upload.fields([{ name: "resume", maxCount: 1 }]), uploadResume)


router.get("/", getresumeFile)


export default router
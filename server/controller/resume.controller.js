import Resume from "../model/resume.model.js";
import pdf from "pdf-parse/lib/pdf-parse.js";
import fs from "fs"
import path from "path"
import { sendToLLM } from "../lib/llm.js";
import { fileURLToPath } from 'url';

const analyzeResume = async (resumeText, jobDescription) => {
    try {
        console.log("resumeText, jobDescription",resumeText, jobDescription)

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
       
        const resumePath = path.join(__dirname, "..", resumeText)
        const resumeBuffer = fs.readFileSync(resumePath)
        const pdfData = await pdf(resumeBuffer)
        const resumeTextRead = pdfData.text
        // send to the LLM
        const result = await sendToLLM({
            resumeText: resumeTextRead,
            jobDescription:jobDescription
        })
        // console.log("result",result)
        return result
     
     
    } catch (error) {
        console.log(`Error in the analyzeResume : ${error}`)
     
    }
}

export const uploadResume = async (req, res) => {
    try {
        const { jobDescriptionText } = req.body;
   
        const resumePath = req.files?.resume?.[0]?.path;
        const resumPathreplace=resumePath.replace(/\\/g, '/');
  
     
        console.log('req.files:',resumePath);
  const newUser = await Resume.create({
            jobDescriptionText: jobDescriptionText,
            resumeFilePath: resumPathreplace
        })
        res.cookie("newUser", newUser._id, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true, //prevent XSS attacks,
            sameSite: "strict", //prevent CSRF attacks
            secure: process.env.NODE_ENV === "production",
        });
        let reusltData=await analyzeResume(newUser.resumeFilePath,newUser.jobDescriptionText)
        
        res.status(200).json({ success: true, newUser,reusltData })
    } catch (error) {
        console.log(`Error in the uploadResume : ${error}`)
        res.status(500).json({ message: "Internal server Error" })
    }
}

export const getresumeFile = async (req, res) => {
    try {
        const resumeId = req.cookies.newUser
        console.log("resumeId", resumeId)
        if (!resumeId) {
            return res.status(400).json({ message: "Resume ID not found in cookies" });
        }
        const resumeData = await Resume.findById(resumeId)
        if (!resumeData) {
            return res.status(404).json({ message: "Resume not found" });
        }
        res.status(200).json({ message: true, resumeData })

    } catch (error) {

        console.log(`Error in the uploadResume : ${error}`)
        res.status(500).json({ message: "Internal server Error" })
    }
}


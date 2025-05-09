import Resume from "../model/resume.model.js";
import pdf from "pdf-parse/lib/pdf-parse.js";
import fs from "fs"
import path from "path"
import { sendToLLM } from "../lib/llm.js";


const analyzeResume = async (resumeText, jobDescription) => {
    try {
        console.log("resumeText, jobDescription", resumeText, jobDescription)



        const resumePath = path.resolve('D:/MERN Stack/resume_analyze/uploads', resumeText);
        const resumeBuffer = fs.readFileSync(resumePath)
        const pdfData = await pdf(resumeBuffer)
        const resumeTextRead = pdfData.text
        console.log("resumeTextRead", resumeTextRead)
        // send to the LLM
        const result = await sendToLLM({
            resumeText: resumeTextRead,
            jobDescription: jobDescription
        })

        return result
    } catch (error) {
        console.log(`Error in the analyzeResume : ${error}`)

    }
}

export const uploadResume = async (req, res) => {
    try {
        const { jobDescriptionText } = req.body;

        const resumePath = req.files?.resume?.[0]?.path;
        const resumPathreplace = resumePath.replace(/\\/g, '/');


        console.log('req.files:', resumePath);
        const newUser = await Resume.create({
            jobDescriptionText: jobDescriptionText,
            resumeFilePath: resumPathreplace
        })

        let resultData = await analyzeResume(newUser.resumeFilePath, newUser.jobDescriptionText)

        res.status(200).json({ success: true, resultData })
    } catch (error) {
        console.log(`Error in the uploadResume : ${error}`)
        res.status(500).json({ message: "Internal server Error" })
    }
}



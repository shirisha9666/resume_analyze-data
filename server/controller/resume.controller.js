import Resume from "../model/resume.model.js";
import pdf from "pdf-parse/lib/pdf-parse.js";
import fs from "fs"
import path from "path"
import { sendToLLM } from "../lib/llm.js";
import { fileURLToPath } from 'url';


export const uploadResume=async(req,res)=>{
    try {
        const {jobDescriptionText}=req.body;
      
   
       const resume= req.files['resume'][0].path;
       const resumPath=resume.replace(/\\/g, '/');

        const newUser=await Resume.create({
            jobDescriptionText:jobDescriptionText,
            resumeFilePath:resumPath
        })
        res.cookie("newUser", newUser._id, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true, //prevent XSS attacks,
            sameSite: "strict", //prevent CSRF attacks
            secure: process.env.NODE_ENV === "production",
          });
        res.status(200).json({success:true,newUser})
    } catch (error) {
        console.log(`Error in the uploadResume : ${error}`)
        res.status(500).json({message:"Internal server Error"})
    }
}

export const getresumeFile=async(req,res)=>{
    try {
        const resumeId=req.cookies.newUser
        console.log("resumeId",resumeId)
        if(!resumeId){
            return res.status(400).json({ message: "Resume ID not found in cookies" });
        }
       const resumeData=await Resume.findById(resumeId)
       if(!resumeData){
        return res.status(404).json({ message: "Resume not found" });
       }
       res.status(200).json({message:true,resumeData})
        
    } catch (error) {
        
        console.log(`Error in the uploadResume : ${error}`)
        res.status(500).json({message:"Internal server Error"})
    }
}
export const analyzeResume =async(req,res)=>{
try {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const userId=req.cookies.newUser
    const user=await Resume.findById(userId)
    const resumePath=path.join(__dirname,"..",user.resumeFilePath)
    const resumeBuffer =fs.readFileSync(resumePath)
    const pdfData=await pdf(resumeBuffer)
    const resumeText=pdfData.text
    // send to the LLM
    const result=await sendToLLM({
        resumeText:resumeText,
        jobDescription:user.jobDescriptionText
    })
    console.log('Analysis Result:', result);
    res.status(200).json({
        success: true,
        message: 'Resume analysis completed successfully',
        result,
      });
} catch (error) {
    console.log(`Error in the analyzeResume : ${error}`)
    res.status(500).json({message:"Internal server Error"})
}
}

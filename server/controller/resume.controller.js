import Resume from "../model/resume.model.js";
import pdf from "pdf-parse/lib/pdf-parse.js";
import fs from "fs";

import { sendToLLM } from "../lib/llm.js";
import cloudinary from "../lib/cloudinary.js";


const analyzeResume = async (resumeText, jobDescription) => {
  try {
    //         console.log("resumeText, jobDescription", resumeText, jobDescription)
    //  const resumePath = path.resolve('D:/MERN Stack/resume_analyze/uploads', resumeText);
    //         const resumeBuffer = fs.readFileSync(resumePath)
    //         const pdfData = await pdf(resumeBuffer)
    //         const resumeTextRead = pdfData.text
    //         console.log("resumeTextRead", resumeTextRead)
    // send to the LLM
    // const response = await axios.get(resumeText, {
    //   responseType: "arraybuffer",
    // });
    // const resumeBuffer = response.data;
    // const pdfData = await pdf(resumeBuffer);
    // const resumeTextRead = pdfData.data;

    const result = await sendToLLM({
      resumeText: resumeText,
      jobDescription: jobDescription,
    });

    return result;
  } catch (error) {
    console.log(`Error in the analyzeResume : ${error}`);
  }
};

export const uploadResume = async (req, res) => {
  try {
    const { jobDescriptionText } = req.body;
    const resumeFile = req.files?.resume?.[0];
    if (!resumeFile) {
      return res.status(400).json({ message: "Resume file is required" });
    }
     const pdfData = await pdf(fs.readFileSync(resumeFile.path));
    const resumeTextRead = pdfData.text;
    const cloudinaryResult = await cloudinary.uploader.upload(resumeFile.path, {
      resource_type: "raw",
      folder: "resumes",
         access_mode: "public",
    });
    const cloudinaryUrl = cloudinaryResult.secure_url;
    // const resumePath = req.files?.resume?.[0]?.path;
    // const resumPathreplace = resumePath.replace(/\\/g, '/');

    console.log("req.files:", cloudinaryUrl);
    const newUser = await Resume.create({
      jobDescriptionText: jobDescriptionText,
      resumeFilePath: cloudinaryUrl,
    });

    let resultData = await analyzeResume(
      newUser.resumeFilePath,
      newUser.jobDescriptionText
    );

    res.status(200).json({ success: true, resultData });
  } catch (error) {
    console.log(`Error in the uploadResume : ${error}`);
    res.status(500).json({ message: "Internal server Error" });
  }
};

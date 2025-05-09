import Resume from "../model/resume.model.js";
import pdf from "pdf-parse/lib/pdf-parse.js";
import fs from "fs";

import { sendToLLM } from "../lib/llm.js";
import cloudinary from "../lib/cloudinary.js";


const analyzeResume = async (resumeText, jobDescription) => {
  try {
 

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

    const cloudinaryResult = await cloudinary.uploader.upload(resumeFile.path, {
      resource_type: "raw",
      folder: "resumes",
         access_mode: "public",
    });
    const cloudinaryUrl = cloudinaryResult.secure_url;
  

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

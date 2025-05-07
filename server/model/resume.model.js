import mongoose from "mongoose";

const resumeModel=new mongoose.Schema({
    resumeText:{
        type:String,
   
    },
    jobDescriptionText:{
        type:String,
   
    },
    resumeFilePath:{
        type:String,
      
    },
    matchScore:{
        type:String, 
    },
    summary: String,
    suggestions: [String],
},{timestamps:true})

const Resume=mongoose.model("resume",resumeModel)

export default Resume
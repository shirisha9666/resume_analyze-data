import mongoose from "mongoose";

const resumeModel=new mongoose.Schema({
  
    jobDescriptionText:{
        type:String,
   
    },
    resumeFilePath:{
        type:String,
        required:true
      
    },
  
},{timestamps:true})

const Resume=mongoose.model("resume",resumeModel)

export default Resume
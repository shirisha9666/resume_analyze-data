import React, { useRef, useState } from "react";
import { useAppContext } from "../context/Store";
import  { toast } from 'react-hot-toast';

const Home = () => {
    const [jobDescriptionText, setJobDescriptionText] = useState("");
    const [resume, setResume] = useState(null);
    const fileInputRef = useRef(null);


    const { uploadresume, loading } = useAppContext();


    const handlePdfChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        setResume(file);
        }else{
           return toast.error("No file selected")
        }
    };

    const handleresume = (e) => {
        e.preventDefault();
        uploadresume(resume, jobDescriptionText);


        console.log("result", resume, jobDescriptionText);
    };

    
    return (
        <div className="main-div">
            <div className="section-one">
                <h1>Resume Analysis</h1>
                <form onSubmit={handleresume}>
                    <label>Job Description</label>
                    <textarea
                        type="text"
                        name="formData"
                        placeholder="Type Job Description"
                        value={jobDescriptionText}
                        onChange={(e) => setJobDescriptionText(e.target.value)}
                    />
                    <label>Upload Resume</label>
                    <button
                        onClick={() => fileInputRef.current.click()}
                        className="resume-upload "
                        type="button"
                    >
                        Upload Resume
                    </button>
                    {resume && (
                        <p className="para">
                            Selected file: <strong className="show-path">{resume.name}</strong>
                        </p>
                    )}
                    <input
                        type="file"
                        name="resume"
                        ref={fileInputRef}
                        onChange={handlePdfChange}
                        className="hidden"
                         accept="application/pdf"
                    />
                    <button className="btn" type="submit">
                        {loading ? "Loading........" : "Analyze Resume"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Home;

import React, { useRef, useState } from "react";
import { useAppContext } from "../context/Store";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [jobDescriptionText, setJobDescriptionText] = useState("");
    const [resume, setResume] = useState(null);
    const fileInputRef = useRef(null);
    let navigate = useNavigate()

    const { uploadresume, loading } = useAppContext();


    const handlePdfChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setResume(file);
        }
    };

    const handleresume = (e) => {
        e.preventDefault();
        uploadresume(resume, jobDescriptionText);
        navigate("/resume/suggestions")

        console.log("result", resume, jobDescriptionText);
    };

    //
    return (
        <div className="main-div">
            <div className="section-one">
                <h1>Resume Analysis</h1>
                <form onSubmit={handleresume}>
                    <label>Job Description</label>
                    <textarea
                        type="text"
                        name="formData"
                        placeholder="type job description"
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

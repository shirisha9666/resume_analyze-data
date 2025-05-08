import React, { useRef, useState } from "react";

const Home = () => {
  const [formData, setFormdata] = useState();
  const [pdfData, setPdfData] = useState();
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPdfData(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

//   console.log(pdfData,formData);
  return (
    <div className="main-div">
        <div className="section-one">
            <h1>Resume Analyze</h1>
      <form>
        <label>Job Description</label>
        <textarea
          type="text"
          placeholder="type job description"
          value={formData}
          onChange={(e) => setFormdata(e.target.value)}
        />
        <label>Upload Resume</label>
        <button onClick={() => fileInputRef.current.click()} className="resume-upload ">
          Upload Resume
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
        <button className="btn">Analyze Resume</button>
      </form>
      </div>
    </div>
  );
};

export default Home;

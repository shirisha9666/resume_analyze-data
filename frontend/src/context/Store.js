import { createContext, useContext, useState } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
const [loading,setLoading]=useState(false)


  
   const BASE_URL = `${process.env.REACT_APP_API_URL}/api/resume/upload`;
  //  const BASE_URL="http://localhost:5003/api/resume/upload"

  const uploadresume = async (file, jobDescriptionText) => {
    try {
        setLoading(true);
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescriptionText", jobDescriptionText);

      const res = await axios.post(BASE_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
       const { resultData, resumeUrl } = res.data;
       console.log("resumeUrl",resumeUrl)
  
       if (resultData && resumeUrl) {
      localStorage.setItem("matchResult", JSON.stringify(resultData));
      localStorage.setItem("resumeUrl", resumeUrl);
    } else {
      console.warn("Missing resultData or resumeUrl in response");
    }
  
    } catch (error) {
      console.log(error.response.data.message || "Something went wrong");
    } finally {
        setLoading(false);
    }
  };

  return (
    <AppContext.Provider value={{ uploadresume,loading }}>
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => {
  return useContext(AppContext);
};

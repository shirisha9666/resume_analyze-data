import { createContext, useContext, useState } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

 
  let [respone, setResponse] = useState([]);
  const [loading,setLoading]=useState(false)

  const BASE_URL = "http://localhost:5003/api/resume/upload";

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
  
      setResponse(res.data.resultData);
    } catch (error) {
      console.log(error.response.data.message || "Something went wrong");
    } finally {
        setLoading(false);
    }
  };

  return (
    <AppContext.Provider value={{ uploadresume, respone,loading }}>
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => {
  return useContext(AppContext);
};

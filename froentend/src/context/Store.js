import { createContext, useContext, useState } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    
  let loading = false;
  let [respone, setResponse] = useState([]);

  const BASE_URL = "http://localhost:5003/api/resume/upload";

  const uploadresume = async (file, jobDescriptionText) => {
    try {
      loading = true;
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescriptionText", jobDescriptionText);

      const res = await axios.post(BASE_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("res.data.newUser", res.data.newUser);
      setResponse(res.data.reusltData);
    } catch (error) {
      console.log(error.response.data.message || "Something went wrong");
    } finally {
      loading = false;
    }
  };

  return (
    <AppContext.Provider value={{ uploadresume, respone }}>
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => {
  return useContext(AppContext);
};

import React from "react";
import { useAppContext } from "../context/Store";

const Suggestions = () => {
  let cleanedRespone = null;

  const { loading } = useAppContext();
  const respone=JSON.parse(localStorage.getItem("matchResult"));

  console.log("loading", loading);

  try {
    const raw =
      typeof respone === "string"
        ? respone.replace(/```json|```/g, "").trim()
        : respone;

    cleanedRespone = JSON.parse(raw);

    console.log("Parsed Response Keys:", Object.keys(cleanedRespone));
  } catch (err) {
    console.error("JSON parsing error:", err.message);
  }

  return (
    <div className="section-suggestions">
      <div className="white suggestion-container">
        <h1 className="heading">Resume Analysis Result</h1>

        {loading ? (
          <span className="white loading-style">Loading...</span>
        ) : (
          <>
            {cleanedRespone &&
              Object.entries(cleanedRespone).map(([key, value], index) => (
                <div className="flex child-1" key={index}>
                  <span className="score">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                  <span className="colen">:</span>
                  <span className="dec">
                    {typeof value === "string"
                      ? value
                      : value.map((item, i) => (
                          <span key={i}>
                            • {item}
                            <br />
                          </span>
                        ))}
                  </span>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Suggestions;

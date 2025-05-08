import axios from "axios";




export const sendToLLM = async ({ resumeText, jobDescription }) => {
    try {
        const apiKey = process.env.API_KEY;
     
        let content = `
        Please analyze the following resume and job description, and return your response in strict JSON format only.
        
        Resume:
        ${resumeText}
        
        Job Description:
        ${jobDescription}
        
        Return a JSON object with the following structure:
        
        {
          "matchScore": "percentage as a string, e.g., '85%'",
          "strengths": ["list of strengths"],
          "weaknesses": ["list of weaknesses"],
          "suggestions": ["list of improvement suggestions"],
          "summary": "a short summary of the overall match"
        }
        
        Do not include any explanations or markdown formatting—just the JSON object.
        `;
        
        const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey} `, {
            contents: [{ parts: [{ text: content }] }],
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        const result = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
        return result || 'No suggestions returned';
    } catch (error) {

        console.error('Error sending data to LLM:', error);
        throw new Error('Failed to analyze resume');
    }

}

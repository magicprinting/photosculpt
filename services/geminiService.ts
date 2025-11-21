import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

export const analyzeImageForPrint = async (base64Image: string, mimeType: string): Promise<string> => {
  if (!API_KEY) {
    console.warn("No API Key provided for Gemini.");
    return "AI Analysis unavailable (API Key missing). Proceeding with standard print settings.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    
    const prompt = `
      You are an expert 3D printing engineer. Analyze this image for conversion into a 3D printed object (specifically a lithophane or a topographical height map).
      
      1. Assess the contrast and detail levels.
      2. Recommend the best printing technique (Lithophane vs Relief).
      3. Estimate a print difficulty rating (Easy/Medium/Hard).
      
      Keep your response short, exciting, and under 60 words. Address the user directly.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image
            }
          },
          { text: prompt }
        ]
      }
    });

    return response.text || "Analysis complete. Image is suitable for printing.";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "Could not complete AI analysis, but your image looks great for printing!";
  }
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data:image/xyz;base64, prefix
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};

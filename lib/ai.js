import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function getTaskSuggestions(description) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `Given this task description: "${description}", suggest 2-3 concrete steps to complete it effectively. Format as a JSON array of strings. Keep each suggestion under 100 characters.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("Error getting AI suggestions:", error);
    return [];
  }
}

export async function getPriorityRecommendation(taskDescription) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `Based on this task description: "${taskDescription}", recommend a priority level (LOW, MEDIUM, or HIGH) and provide a very brief reason why. Format response as JSON: {"priority": "...", "reason": "..."}.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("Error getting priority recommendation:", error);
    return { priority: "MEDIUM", reason: "AI recommendation unavailable" };
  }
}

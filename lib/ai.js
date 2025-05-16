import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function getTaskSuggestions(description) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Updated model name
    const prompt = `Given this task description: "${description}", suggest 2-3 concrete steps to complete it effectively. Return only a JSON array of strings, with no markdown formatting or backticks. Keep each suggestion under 100 characters.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up any potential markdown or backticks
    const cleanJson = text.replace(/```json\s*|\s*```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Error getting AI suggestions:", error);
    return ["Plan the task", "Execute the task", "Review the work"];
  }
}

export async function getPriorityRecommendation(taskDescription) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Updated model name
    const prompt = `Based on this task description: "${taskDescription}", recommend a priority level (LOW, MEDIUM, or HIGH) and provide a very brief reason why. Return only a JSON object with no markdown formatting or backticks, in this exact format: {"priority": "PRIORITY_LEVEL", "reason": "BRIEF_REASON"}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up any potential markdown or backticks
    const cleanJson = text.replace(/```json\s*|\s*```/g, '').trim();
    const parsed = JSON.parse(cleanJson);
    
    // Validate the response format
    if (!parsed.priority || !parsed.reason || 
        !['LOW', 'MEDIUM', 'HIGH'].includes(parsed.priority.toUpperCase())) {
      throw new Error('Invalid AI response format');
    }
    
    return {
      priority: parsed.priority.toUpperCase(),
      reason: parsed.reason
    };
  } catch (error) {
    console.error("Error getting priority recommendation:", error);
    return { 
      priority: "MEDIUM", 
      reason: "Priority could not be determined automatically" 
    };
  }
}

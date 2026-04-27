import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

let ai;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

export const analyzeEmergency = async (room, category, message) => {
  if (!ai) {
    console.warn('⚠️ GEMINI_API_KEY missing. Using Mock AI logic for demo.');
    return {
      severity: category.toUpperCase() === 'FIRE' || category.toUpperCase() === 'MEDICAL' ? 'CRITICAL' : 'WARNING',
      category: category.toUpperCase(),
      english_translation: message || 'No message provided',
      confidence: 0.9,
      recommended_actions: ['Dispatch team to room ' + room, 'Acknowledge alert']
    };
  }

  const prompt = `
    You are an AI Emergency Response Orchestrator for a hotel/hospitality environment.
    Analyze the following emergency report and return a JSON object (and ONLY a JSON object).

    Input:
    Room: ${room}
    Category: ${category}
    Message: ${message || 'None'}

    Output Requirements (JSON Format):
    {
      "severity": "CRITICAL" | "WARNING" | "SAFE",
      "category": "FIRE" | "MEDICAL" | "SECURITY" | "OTHER",
      "english_translation": "Translate the message to English, or summarize it if already in English",
      "confidence": (number between 0 and 1 representing your confidence in this classification),
      "recommended_actions": ["array of 1-3 short recommended actions for the staff"]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error("Gemini AI Analysis Error:", error);
    // Fallback in case of failure
    return {
      severity: 'WARNING',
      category: category.toUpperCase() || 'OTHER',
      english_translation: message || '',
      confidence: 0.5,
      recommended_actions: ['Investigate manually']
    };
  }
};

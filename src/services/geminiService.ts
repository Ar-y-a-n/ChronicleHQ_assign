// src/services/geminiService.ts
/// <reference types="vite/client" />
import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Initialize the API client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// 2. Select the specific model (Flash is fast and cheap)
// ✅ NEW (Specific version)
// ✅ FIX: Use the standard 'gemini-pro' model which is universally available
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export const geminiService = {
  generateText: async (currentText: string): Promise<string> => {
    try {
      // 3. Construct a prompt that explains the task
      // We send the current text and ask Gemini to continue it.
      const prompt = `
  You are an autocomplete engine for a text editor.
  Your task is to generate the NEXT part of the text based on the user's input.

  STRICT RULES:
  1. Output ONLY the new text.
  2. DO NOT repeat the input text.
  3. DO NOT start with "Here is the continuation" or quotes.
  4. If the input ends mid-sentence, finish it naturally.
  5. Keep it concise (2-3 sentences).

  USER INPUT:
  "${currentText}"

  CONTINUATION:
`;

      // 4. Call the API
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return text;
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw new Error("Failed to generate text via Gemini Flash.");
    }
  }
};
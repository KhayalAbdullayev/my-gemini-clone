import { GoogleGenerativeAI } from "@google/generative-ai";
import { marked } from "marked"; 

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

console.log("Gemini API key:", apiKey);
const genAI = new GoogleGenerativeAI(apiKey);
const MODEL_NAME = "gemini-1.5-pro";

const responseCache = new Map();
let lastRequestTime = 0;
const REQUEST_DELAY = 2000;

export default async function runChat(prompt) {
  const cachedResponse = responseCache.get(prompt);
  if (cachedResponse) return cachedResponse;

  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  if (timeSinceLastRequest < REQUEST_DELAY) {
    await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY - timeSinceLastRequest));
  }
  lastRequestTime = Date.now();

  try {
    if (!apiKey || apiKey === "" || apiKey === undefined) {
      throw new Error("API_KEY_INVALID: No API key found in environment.");
    }

    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.9,
      },
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const response = await result.response;
    const rawText = response.text(); 
    const html = marked.parse(rawText); 

    responseCache.set(prompt, html);
    setTimeout(() => responseCache.delete(prompt), 60 * 60 * 1000);

    return html;
  } catch (error) {
    console.error("API Error:", error);
    const errMsg = error?.message || "";
    if (errMsg.includes("API_KEY_INVALID") || errMsg.includes("API key not valid")) {
      return "⚠️ Configuration error. Please contact support.";
    } else if (errMsg.includes("quota")) {
      return "⚠️ Free limit reached. Resets in 24 hours.";
    }
    return "⚠️ Service unavailable. Try again later.";
  }
}

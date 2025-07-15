import { GoogleGenAI } from "@google/genai";

function getApiKey(): string {
  const apiKey = process.env.NEXT_PUBLIC_GEN_AI_KIT;
  if (!apiKey?.trim()) {
    throw new Error("API key is required");
  }
  return apiKey;
}

async function generateAIResponse(
  message: string,
  systemPrompt: string
): Promise<string> {
  if (!message?.trim()) {
    throw new Error("Message cannot be empty");
  }

  try {
    const genAI = new GoogleGenAI({ apiKey: getApiKey() });

    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: message,
      config: {
        systemInstruction: systemPrompt, 
      },
    });

    if (!response.text) {
      throw new Error("No response text received from AI");
    }

    return response.text;
  } catch (error) {
    throw new Error(
      `Failed to send message: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export const genaiService = {
  sendMessageWithPrompt(
    message: string,
    customPrompt: string
  ): Promise<string> {
    return generateAIResponse(message, customPrompt);
  },
};

import { GoogleGenAI } from '@google/genai';

let genAIInstance: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your-gemini-api-key' || apiKey === 'placeholder-gemini-key') {
    throw new Error('GEMINI_API_KEY is not configured in environment variables.');
  }

  if (!genAIInstance) {
    genAIInstance = new GoogleGenAI({ apiKey });
  }

  return genAIInstance;
}

export function getGeminiModelName(): string {
  return process.env.GEMINI_MODEL || 'gemini-3.8-flash';
}

interface GenerateTextOptions {
  systemInstruction?: string;
  temperature?: number;
  maxOutputTokens?: number;
  retries?: number;
}

/**
 * Execute Gemini model call with exponential backoff on 429 / 5xx errors.
 */
export async function generateContentSafe(
  prompt: string,
  options: GenerateTextOptions = {}
): Promise<{ text: string; model: string }> {
  const model = getGeminiModelName();
  const maxRetries = options.retries ?? 3;
  let delay = 1000;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const ai = getGeminiClient();
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction: options.systemInstruction,
          temperature: options.temperature ?? 0.7,
          maxOutputTokens: options.maxOutputTokens ?? 1024,
        },
      });

      return {
        text: response.text || '',
        model,
      };
    } catch (error: unknown) {
      const isRetryable =
        error instanceof Error &&
        (error.message.includes('429') ||
          error.message.includes('503') ||
          error.message.includes('ResourceExhausted') ||
          error.message.includes('rate limit'));

      if (isRetryable && attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
        continue;
      }

      console.error('[Gemini AI Provider Error]', error);
      throw error;
    }
  }

  throw new Error('Exceeded maximum retry attempts for Gemini API call.');
}

/**
 * Server-side streaming helper for the AI Mentor chat route.
 */
export async function streamGeminiContent(
  contents: string | Array<{ role: string; parts: Array<{ text: string }> }>,
  systemInstruction?: string
) {
  const ai = getGeminiClient();
  const model = getGeminiModelName();
  const maxRetries = 2;
  let delay = 1200;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await ai.models.generateContentStream({
        model,
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
          maxOutputTokens: 600,
        },
      });
    } catch (error: unknown) {
      const isRetryable =
        error instanceof Error &&
        (error.message.includes('503') ||
          error.message.includes('429') ||
          error.message.includes('high demand') ||
          error.message.includes('UNAVAILABLE'));

      if (isRetryable && attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 1.5;
        continue;
      }
      throw error;
    }
  }

  throw new Error('Exceeded retry attempts for Gemini streaming call.');
}

// domain/llm/providers/gemini.provider.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { BaseLLMProvider } from './base-llm.provider';

export class GeminiProvider extends BaseLLMProvider {
  name = 'gemini';
  private client: GoogleGenerativeAI;
  private readonly modelName = 'gemini-1.5-flash';

  constructor(promptTemplate) {
    super(promptTemplate);
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('GEMINI_API_KEY missing');
    this.client = new GoogleGenerativeAI(apiKey);
  }

  async callModel(prompt: string): Promise<string> {
    const model = this.client.getGenerativeModel({ model: this.modelName });
    const result = await model.generateContent(prompt);
    return result.response.text();
  }
}

import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { BaseLLMProvider } from './base-llm.provider';

export class OpenAIProvider extends BaseLLMProvider {
  name = 'openai';
  private client: OpenAI;

  constructor(promptTemplate) {
    super(promptTemplate);
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error('OPENAI_API_KEY missing');
    this.client = new OpenAI({ apiKey });
  }

  async callModel(prompt: string): Promise<string> {
    const messages: ChatCompletionMessageParam[] = [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: prompt },
    ];
    const completion = await this.client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
    });
    return completion.choices[0].message.content ?? '';
  }
}

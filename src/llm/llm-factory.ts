// domain/llm/llm-factory.ts
import { LLMProviders } from 'src/common/constants';
import { DefaultPromptTemplate } from './prompts/main.prompt';
import { LLMProvider } from './providers/base-llm.provider';
import { GeminiProvider } from './providers/gemini';
import { OpenAIProvider } from './providers/open-ai';

export class LLMFactory {
  static create(providerName: LLMProviders): LLMProvider {
    const promptTemplate = new DefaultPromptTemplate();

    switch (providerName) {
      case 'openai':
        return new OpenAIProvider(promptTemplate);
      case 'gemini':
        return new GeminiProvider(promptTemplate);
      default:
        throw new Error(`Unsupported LLM provider: ${String(providerName)}`);
    }
  }
}

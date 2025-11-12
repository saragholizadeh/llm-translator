import { PromptTemplate } from '../prompts/base.prompt';

export interface LLMProvider {
  name: string;
  callPrompt(prompt: string, language: string): Promise<string>;
  callTranslatePrompt(text: string, targetLanguage: string): Promise<string>;
}

export abstract class BaseLLMProvider implements LLMProvider {
  abstract name: string;

  constructor(protected promptTemplate: PromptTemplate) {}

  abstract callModel(prompt: string): Promise<string>;

  async callPrompt(prompt: string, language: string): Promise<string> {
    const finalPrompt = this.promptTemplate.buildPrompt({
      language,
      text: prompt,
      type: 'prompt',
    });
    return this.callModel(finalPrompt);
  }

  async callTranslatePrompt(
    text: string,
    targetLanguage: string,
  ): Promise<string> {
    const finalPrompt = this.promptTemplate.buildPrompt({
      type: 'translate',
      text,
      language: targetLanguage,
    });
    return this.callModel(finalPrompt);
  }
}

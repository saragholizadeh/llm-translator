import { BuildPromptArgs, PromptTemplate } from './base.prompt';

export class DefaultPromptTemplate implements PromptTemplate {
  buildPrompt(args: BuildPromptArgs): string {
    const { type, text, language } = args;
    if (type === 'prompt') {
      return `Answer the following in ${language}:\n\n${text}`;
    }
    return `Translate the following text into ${language}:\n\n${text}`;
  }
}

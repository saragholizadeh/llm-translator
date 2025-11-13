export interface PromptTemplate {
  buildPrompt(args: BuildPromptArgs): string;
}
export interface BuildPromptArgs {
  type: 'prompt' | 'translate';
  text: string;
  language: string;
}

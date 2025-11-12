export const TRSNSALTOR_PROVIDERS = ['ai', 'google'] as const;

export enum ReqAndResStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export type LLMProviders = 'openai' | 'gemini'; // This could come from a config file or database.

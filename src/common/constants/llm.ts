export const TRSNSALTOR_PROVIDERS = ['ai', 'google'] as const;

export enum ReqAndResStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

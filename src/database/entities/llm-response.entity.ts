import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { randomUUID } from 'crypto';
import { LLMRequest } from './llm-request.entity';

@Entity()
export class LLMResponse {
  @PrimaryKey()
  id: string = randomUUID();

  @ManyToOne(() => LLMRequest)
  request!: LLMRequest;

  @Property()
  language!: string;

  @Property({ type: 'text', nullable: true })
  result?: string;

  @Property({ onCreate: () => new Date() })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}

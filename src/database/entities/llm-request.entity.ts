import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
  Cascade,
  Enum,
} from '@mikro-orm/core';
import { randomUUID } from 'crypto';
import { LLMResponse } from './llm-response.entity';

enum ReqAndResStatus {
  PENDING = 0,
  IN_PROGRESS = 1,
  COMPLETED = 2,
  FAILED = 3,
}

@Entity()
export class LLMRequest {
  @PrimaryKey()
  id: string = randomUUID();

  @Property()
  prompt_text!: string;

  @Property()
  sourceLanguage!: string;

  @Enum(() => ReqAndResStatus)
  responseStatus!: ReqAndResStatus;

  @Enum(() => ReqAndResStatus)
  backgroundTaskStatus!: ReqAndResStatus;

  @Property({ onCreate: () => new Date() })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @OneToMany(() => LLMResponse, (t) => t.request, {
    cascade: [Cascade.PERSIST, Cascade.REMOVE],
  })
  responses = new Collection<LLMResponse>(this);
}

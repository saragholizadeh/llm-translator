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
import * as constants from '../../common/constants';

@Entity()
export class LLMRequest {
  @PrimaryKey()
  id: string = randomUUID();

  @Property()
  prompt_text!: string;

  @Property()
  sourceLanguage!: string;

  @Property()
  defaultTargetLanguage: string = constants.SupportedLanguages.EN;

  @Enum(() => constants.ReqAndResStatus)
  responseStatus: constants.ReqAndResStatus;

  @Property({ onCreate: () => new Date() })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @OneToMany(() => LLMResponse, (t) => t.request, {
    cascade: [Cascade.PERSIST, Cascade.REMOVE],
  })
  responses = new Collection<LLMResponse>(this);
}

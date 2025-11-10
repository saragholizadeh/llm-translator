import { Entity, PrimaryKey, Property, ManyToOne, Enum } from '@mikro-orm/core';
import { randomUUID } from 'crypto';
import { LLMRequest } from './llm-request.entity';
import * as constants from '../../common/constants';
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

  @Enum(() => constants.ReqAndResStatus)
  status: constants.ReqAndResStatus;

  @Property({ onCreate: () => new Date() })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}

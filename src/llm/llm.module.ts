import { Module } from '@nestjs/common';
import { LLMController } from './llm.controlller';
import { LLMService } from './llm.service';
import { LLMRepository } from './llm.repository';
import { LLMRequest, LLMResponse } from 'src/database/entities';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TranslationQueue } from './llm.queue';

@Module({
  imports: [MikroOrmModule.forFeature([LLMRequest, LLMResponse])],
  controllers: [LLMController],
  providers: [LLMService, LLMRepository, TranslationQueue],
})
export class LlmModule {}

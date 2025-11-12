import { Injectable } from '@nestjs/common';
import { LLMReqDto } from './dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { LLMRequest, LLMResponse } from 'src/database/entities';
import { EntityRepository } from '@mikro-orm/core';
import { LLMFactory } from './llm-factory';
import { LLMProvider } from './providers/base-llm.provider';

@Injectable()
export class LLMService {
  constructor(
    @InjectRepository(LLMRequest)
    private readonly llmRequestRepo: EntityRepository<LLMRequest>,

    @InjectRepository(LLMResponse)
    private readonly llmResponseRepo: EntityRepository<LLMResponse>,

    // BullMQ (Queue)
    // private readonly translationQueue: Queue,
  ) {}

  async callLLM(dto: LLMReqDto): Promise<string> {
    // 1. Call llm and give prompt to it
    const provider: LLMProvider = LLMFactory.create(dto.llm_provider);
    const mainResponse = await provider.callPrompt(
      dto.prompt_text,
      dto.sourceLanguage,
    );
    // 2. Store request
    // const request = await this.saveRequest(dto, mainResponse);

    // 6. Call cache and pass response to it plus languages
    const translations: Record<string, string> = {};
    for (const target of dto.targetLanguages) {
      if (target === dto.sourceLanguage) continue;

      translations[target] = await provider.callTranslatePrompt(
        mainResponse,
        target,
      );
    }

    // 7. Apply all changes into db
    return `Translated`; // do it here
  }
}

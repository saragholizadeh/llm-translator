import { Injectable } from '@nestjs/common';
import { LLMReqDto } from './dto';
import { LLMFactory } from './llm-factory';
import { LLMProvider } from './providers/base-llm.provider';
import { LLMRepository } from './llm.repository';

@Injectable()
export class LLMService {
  constructor(private readonly llmRepo: LLMRepository) {}

  async callLLM(dto: LLMReqDto): Promise<string> {
    try {
      const provider: LLMProvider = LLMFactory.create(dto.llm_provider);
      const mainResponse = await provider.callPrompt(
        dto.prompt_text,
        dto.sourceLanguage,
      );

      const storeRequest = await this.llmRepo.createRequest(
        dto.prompt_text,
        dto.sourceLanguage,
      );

      return `Translated`; // do it here
    } catch (err) {
      throw new Error(err);
    }
  }
}

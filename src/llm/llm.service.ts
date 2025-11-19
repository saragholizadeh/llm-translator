import { Injectable, Inject } from '@nestjs/common';
import { LLMReqDto } from './dto';
import { LLMFactory } from './llm-factory';
import { LLMProvider } from './providers/base-llm.provider';
import { LLMRepository } from './llm.repository';
import { TranslationQueue } from './llm.queue';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class LLMService {
  constructor(
    private readonly llmRepo: LLMRepository,
    private readonly translationQueue: TranslationQueue,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async callLLM(dto: LLMReqDto): Promise<string> {
    const provider: LLMProvider = LLMFactory.create(dto.llm_provider);

    const mainResponse = await provider.callPrompt(
      dto.prompt_text,
      dto.sourceLanguage,
    );

    const request = await this.llmRepo.createRequest(
      dto.prompt_text,
      dto.sourceLanguage,
    );

    await this.llmRepo.createResponse(
      request,
      dto.sourceLanguage,
      mainResponse,
    );

    const mainCacheKey = `llm:${request.id}:${dto.sourceLanguage}`;
    await this.cacheManager.set(mainCacheKey, mainResponse, 3600);

    for (const target of dto.targetLanguages) {
      if (target === dto.sourceLanguage) continue;

      const cacheKey = `llm:${request.id}:${target}`;
      const cached = await this.cacheManager.get(cacheKey);

      if (!cached) {
        this.translationQueue.addJob(
          request.id,
          mainResponse,
          dto.llm_provider,
          target,
        );
      }
    }

    return mainResponse;
  }

  async areAllTranslationsReady(requestId: string): Promise<boolean> {
    const request = await this.llmRepo.findRequestWithResponses(requestId);
    if (!request) return false;
    return request.responses.getItems().every((r) => !!r.result);
  }

  async getCachedResponse(
    requestId: string,
    language: string,
  ): Promise<string | null> {
    return await this.cacheManager.get(`llm:${requestId}:${language}`);
  }
}

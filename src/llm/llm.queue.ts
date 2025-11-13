import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Inject,
} from '@nestjs/common';
import { Queue, Worker, Job } from 'bullmq';
import IORedis from 'ioredis';
import { LLMRepository } from './llm.repository';
import { LLMFactory } from './llm-factory';
import { LLMProvider } from './providers/base-llm.provider';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import * as cacheManager_1 from 'cache-manager';

@Injectable()
export class TranslationQueue implements OnModuleInit, OnModuleDestroy {
  private queue: Queue;
  private worker: Worker;
  private redis: IORedis;

  constructor(
    private readonly llmRepo: LLMRepository,
    @Inject(CACHE_MANAGER) private readonly cacheManager: cacheManager_1.Cache,
  ) {
    this.redis = new IORedis(process.env.REDIS_URL);
    this.queue = new Queue('translationQueue', { connection: this.redis });
  }

  async addJob(
    requestId: string,
    text: string,
    providerName: string,
    targetLanguage: string,
  ) {
    await this.queue.add('translate', {
      requestId,
      text,
      providerName,
      targetLanguage,
    });
  }

  onModuleInit() {
    this.worker = new Worker(
      'translationQueue',
      async (job: Job) => {
        const { requestId, text, providerName, targetLanguage } = job.data;
        const provider: LLMProvider = LLMFactory.create(providerName);

        const translated = await provider.callTranslatePrompt(
          text,
          targetLanguage,
        );

        const request = await this.llmRepo.findRequestWithResponses(requestId);
        if (!request) return;

        await this.llmRepo.createResponse(request, targetLanguage, translated);

        const cacheKey = `llm:${requestId}:${targetLanguage}`;
        await this.cacheManager.set(cacheKey, translated, { ttl: 3600 });

        const allDone = request.responses.getItems().every((r) => r.result);
        if (allDone) {
          await this.llmRepo.updateBackgroundStatus(requestId, 2); // COMPLETED
        }
      },
      { connection: this.redis },
    );
  }

  async onModuleDestroy() {
    await this.worker.close();
    await this.queue.close();
    await this.redis.quit();
  }
}

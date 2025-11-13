import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { LLMRequest, LLMResponse } from 'src/database/entities';

@Injectable()
export class LLMRepository {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(LLMRequest)
    private readonly requestRepo: EntityRepository<LLMRequest>,

    @InjectRepository(LLMResponse)
    private readonly responseRepo: EntityRepository<LLMResponse>,
  ) {}

  async createRequest(
    prompt_text: string,
    sourceLanguage: string,
  ): Promise<LLMRequest> {
    const request = new LLMRequest();
    request.prompt_text = prompt_text;
    request.sourceLanguage = sourceLanguage;
    request.responseStatus = 0;
    request.backgroundTaskStatus = 0;

    await this.em.persistAndFlush(request);
    return request;
  }

  // async findRequestWithResponses(id: string): Promise<LLMRequest | null> {
  //   return this.requestRepo.findOne(id, { populate: ['responses'] });
  // }

  async createResponse(request: LLMRequest, language: string, result?: string) {
    const response = new LLMResponse();
    response.request = request;
    response.language = language;
    response.result = result;

    await this.em.persistAndFlush(response);
    return response;
  }
}

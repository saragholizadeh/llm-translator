import { Body, Controller, Post } from '@nestjs/common';
import { LLMReqDto } from './dto';
import { LLMService } from './llm.service';

@Controller('llm')
export class LLMController {
  constructor(private readonly llmService: LLMService) {}

  @Post('call')
  async callLLM(@Body() dto: LLMReqDto) {
    const result = await this.llmService.callLLM(dto);
    return { result };
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { TranslatorService } from './translator.service';
import { TranslateReqDto } from './dto';

@Controller('translator')
export class TranslatorController {
  constructor(private readonly translatorService: TranslatorService) {}

  @Post('translate')
  async translate(@Body() dto: TranslateReqDto) {
    const result = await this.translatorService.translate(dto);
    return { result };
  }
}

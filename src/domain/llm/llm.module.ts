import { Module } from '@nestjs/common';
import { LlmService } from './llm.service';
import { LlmController } from './llm.controller';
import { TranslatorModule } from './translator/translator.module';

@Module({
  controllers: [LlmController],
  providers: [LlmService],
  imports: [TranslatorModule],
})
export class LlmModule {}

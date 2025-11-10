import { createZodDto } from 'nestjs-zod';
import { SupportedLanguages, TRSNSALTOR_PROVIDERS } from 'src/common/constants';
import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

export const TranslateReqSchema = z.object({
  prompt_text: z.string().min(1, { message: 'Prompt text is required' }),
  sourceLanguage: z.enum(SupportedLanguages),
  targetLanguages: z
    .array(z.enum(SupportedLanguages))
    .min(1, { message: 'At least one target language is required' }),
  translator_provider: z.enum(TRSNSALTOR_PROVIDERS).default('google'),
});

export class TranslateReqDto extends createZodDto(TranslateReqSchema) {
  @ApiProperty({
    example: 'tell me 3 short fun facts about cats',
    description: 'Enter your prompt here',
  })
  prompt_text: string;

  @ApiProperty({
    example: 'en',
    enum: SupportedLanguages,
    description: 'Your prompt language (source language)',
  })
  sourceLanguage: SupportedLanguages;

  @ApiProperty({
    example: ['en', 'fr'],
    enum: SupportedLanguages,
    isArray: true,
    description: 'Languages you want to translate the llm response to',
  })
  targetLanguages: SupportedLanguages[];

  @ApiProperty({
    example: 'google',
    enum: TRSNSALTOR_PROVIDERS,
    description:
      'Choose a translation provider: do you want to use Google Translate or AI?',
    default: 'google',
  })
  translator_provider: 'ai' | 'google';
}

import { createZodDto } from 'nestjs-zod';
import * as constants from 'src/common/constants';
import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

export const LLMReqSchema = z.object({
  prompt_text: z.string().min(1, { message: 'Prompt text is required' }),
  sourceLanguage: z.enum(constants.SupportedLanguages),
  targetLanguages: z
    .array(z.enum(constants.SupportedLanguages))
    .min(1, { message: 'At least one target language is required' }),
  translator_provider: z.enum(constants.TRSNSALTOR_PROVIDERS).default('google'),
});

export class LLMReqDto extends createZodDto(LLMReqSchema) {
  @ApiProperty({
    example: 'tell me 3 short fun facts about cats',
    description: 'Enter your prompt here',
  })
  prompt_text: string;

  @ApiProperty({
    example: 'en',
    enum: constants.SupportedLanguages,
    description: 'Your prompt language (source language)',
  })
  sourceLanguage: constants.SupportedLanguages;

  @ApiProperty({
    example: ['en', 'fr'],
    enum: constants.SupportedLanguages,
    isArray: true,
    description: 'Languages you want to translate the llm response to',
  })
  targetLanguages: constants.SupportedLanguages[];

  @ApiProperty({
    example: 'google',
    enum: constants.TRSNSALTOR_PROVIDERS,
    description:
      'Choose a translation provider: do you want to use Google Translate or AI?',
    default: 'google',
  })
  translator_provider: 'ai' | 'google';

  @ApiProperty({
    example: 'openai',
    type: String,
    description: 'Choose a language model provider (e.g. openai)',
  })
  llm_provider: constants.LLMProviders;
}

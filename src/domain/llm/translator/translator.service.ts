import { Injectable } from '@nestjs/common';
import { TranslateReqDto } from './dto';

@Injectable()
export class TranslatorService {
  async translate(dto: TranslateReqDto): Promise<string> {
    return `Translated`; // do it here
  }
}

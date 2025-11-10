import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { LLMRequest, LLMResponse } from './entities';
import mikroOrmConfig from 'mikro-orm.config';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    MikroOrmModule.forFeature([LLMRequest, LLMResponse]),
  ],
  exports: [MikroOrmModule],
})
export class DatabaseModule {}

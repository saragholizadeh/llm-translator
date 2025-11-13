import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LlmModule } from './llm/llm.module';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true, ttl: 3600 }),
    LlmModule,
    DatabaseModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}

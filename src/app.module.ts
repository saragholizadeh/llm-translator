import { Module } from '@nestjs/common';
import { DomainModule } from './domain/domain.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DomainModule, DatabaseModule],
})
export class AppModule {}

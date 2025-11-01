import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainModule } from './domain/domain.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DomainModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

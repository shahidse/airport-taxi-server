import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import {
  createRepositoryProvider,
  Schemas,
} from '../database/repository/common_provider';

@Module({
  controllers: [QuotesController],
  providers: [
    QuotesService,
    createRepositoryProvider(Schemas.QUOTES),
    createRepositoryProvider(Schemas.USERS),
  ],
})
export class QuotesModule {}

import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import {
  createRepositoryProvider,
  Schemas,
} from '../database/repository/common_provider';

@Module({
  controllers: [FeedbackController],
  providers: [
    FeedbackService,
    createRepositoryProvider(Schemas.FEEDBACK),
    createRepositoryProvider(Schemas.USERS),
    createRepositoryProvider(Schemas.ORDER),
  ],
})
export class FeedbackModule {}

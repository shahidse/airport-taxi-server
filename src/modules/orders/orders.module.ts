import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import {
  createRepositoryProvider,
  Schemas,
} from '../database/repository/common_provider';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    createRepositoryProvider(Schemas.ORDER),
    createRepositoryProvider(Schemas.USERS),
    createRepositoryProvider(Schemas.QUOTES),
  ],
})
export class OrdersModule {}

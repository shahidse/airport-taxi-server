import { Module } from '@nestjs/common';
import { VehiclesCategoriesService } from './vehicles-categories.service';
import { VehiclesCategoriesController } from './vehicles-categories.controller';
import {
  createRepositoryProvider,
  Schemas,
} from '../database/repository/common_provider';

@Module({
  controllers: [VehiclesCategoriesController],
  providers: [
    VehiclesCategoriesService,
    createRepositoryProvider(Schemas.VEHICLE_CATEGORY),
  ],
})
export class VehiclesCategoriesModule {}

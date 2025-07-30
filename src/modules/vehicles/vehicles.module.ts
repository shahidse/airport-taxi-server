import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import {
  createRepositoryProvider,
  Schemas,
} from '../database/repository/common_provider';

@Module({
  controllers: [VehiclesController],
  providers: [VehiclesService, createRepositoryProvider(Schemas.VEHICLE)],
})
export class VehiclesModule {}

import { PartialType } from '@nestjs/swagger';
import { CreateVehiclesCategoryDto } from './create-vehicles-category.dto';

export class UpdateVehiclesCategoryDto extends PartialType(CreateVehiclesCategoryDto) {}

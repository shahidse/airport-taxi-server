import { Inject, Injectable } from '@nestjs/common';
import { CreateVehiclesCategoryDto } from './dto/create-vehicles-category.dto';
import { UpdateVehiclesCategoryDto } from './dto/update-vehicles-category.dto';
import { CommonRepository } from '../database/repository/common_repository';
import { VehicleCategory } from '../database/entities/vehicleCategory.entity';

@Injectable()
export class VehiclesCategoriesService {
  constructor(
    @Inject('VEHICLECATEGORY_REPOSITORY')
    private vehiclesCategoryRepository: CommonRepository<VehicleCategory>,
  ) {}

  create(dto: CreateVehiclesCategoryDto) {
    return this.vehiclesCategoryRepository.create(dto);
  }

  findAll() {
    return this.vehiclesCategoryRepository.findAll({
      order: { createdAt: 'DESC' },
    });
  }

  findOne(id: number) {
    return this.vehiclesCategoryRepository.findOneBy({ id });
  }

  update(id: number, updateVehiclesCategoryDto: UpdateVehiclesCategoryDto) {
    return this.vehiclesCategoryRepository.update(
      { id },
      updateVehiclesCategoryDto,
    );
  }

  remove(id: number) {
    return this.vehiclesCategoryRepository.delete({ id });
  }
}

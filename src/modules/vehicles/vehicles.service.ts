import { Inject, Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { CommonRepository } from '../database/repository/common_repository';
import { Vehicle } from '../database/entities/vehicles.entity';

@Injectable()
export class VehiclesService {
  constructor(
    @Inject('VEHICLE_REPOSITORY')
    private vehicleRepository: CommonRepository<Vehicle>,
  ) {}

  create(createVehicleDto: CreateVehicleDto) {
    return this.vehicleRepository.create(createVehicleDto);
  }

  async findAll(page: number = 1, limit: number = 10) {
    const total = await this.vehicleRepository.count();

    const data = await this.vehicleRepository.findAll({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['category', 'driver'],
      order: { createdAt: 'DESC' },
    });
    return {
      data,
      total,
      page,
      limit,
      pageCount: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    return this.vehicleRepository.findOne({
      where: { id },
      relations: ['category', 'driver'],
    });
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
    await this.vehicleRepository.update({ id }, updateVehicleDto as any);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.vehicleRepository.delete({ id });
    return { message: 'Vehicle deleted successfully' };
  }
}

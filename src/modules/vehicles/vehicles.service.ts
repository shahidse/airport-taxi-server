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

  findOne(id: number) {
    return `This action returns a #${id} vehicle`;
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto) {
    return `This action updates a #${id} vehicle`;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }
}

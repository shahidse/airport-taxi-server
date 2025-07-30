import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VehiclesCategoriesService } from './vehicles-categories.service';
import { CreateVehiclesCategoryDto } from './dto/create-vehicles-category.dto';
import { UpdateVehiclesCategoryDto } from './dto/update-vehicles-category.dto';
import { ApiEndpoint } from 'src/swagger/docs';
import { Public } from 'src/decorators/decorators.decorator';

@Controller({ path: 'vehicles-categories', version: '1' })
export class VehiclesCategoriesController {
  constructor(
    private readonly vehiclesCategoriesService: VehiclesCategoriesService,
  ) {}

  @Public()
  @ApiEndpoint({
    summary: 'Create vehicle category',
    description: 'Create a new vehicle category',
    tags: ['Vehicles Categories'],
    bodyType: CreateVehiclesCategoryDto,
    responses: [
      { status: 201, description: 'Vehicle category created' },
      { status: 422, description: 'Validation error' },
    ],
  })
  @Post()
  create(@Body() createVehiclesCategoryDto: CreateVehiclesCategoryDto) {
    return this.vehiclesCategoriesService.create(createVehiclesCategoryDto);
  }

  @Public()
  @ApiEndpoint({
    summary: 'Get all vehicle categories',
    description: 'Retrieve all vehicle categories',
    tags: ['Vehicles Categories'],
    responses: [{ status: 200, description: 'List of vehicle categories' }],
  })
  @Get()
  findAll() {
    return this.vehiclesCategoriesService.findAll();
  }

  @Public()
  @ApiEndpoint({
    summary: 'Get vehicle category by id',
    description: 'Retrieve a vehicle category by its id',
    tags: ['Vehicles Categories'],
    responses: [
      { status: 200, description: 'Vehicle category found' },
      { status: 404, description: 'Vehicle category not found' },
    ],
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehiclesCategoriesService.findOne(+id);
  }

  @Public()
  @ApiEndpoint({
    summary: 'Update vehicle category',
    description: 'Update a vehicle category by its id',
    tags: ['Vehicles Categories'],
    bodyType: UpdateVehiclesCategoryDto,
    responses: [
      { status: 200, description: 'Vehicle category updated' },
      { status: 404, description: 'Vehicle category not found' },
    ],
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVehiclesCategoryDto: UpdateVehiclesCategoryDto,
  ) {
    return this.vehiclesCategoriesService.update(
      +id,
      updateVehiclesCategoryDto,
    );
  }

  @Public()
  @ApiEndpoint({
    summary: 'Delete vehicle category',
    description: 'Delete a vehicle category by its id',
    tags: ['Vehicles Categories'],
    responses: [
      { status: 200, description: 'Vehicle category deleted' },
      { status: 404, description: 'Vehicle category not found' },
    ],
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiclesCategoriesService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Public } from 'src/decorators/decorators.decorator';
import { ApiEndpoint } from 'src/swagger/docs';

@Controller({ path: 'vehicles', version: '1' })
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  @Public()
  @ApiEndpoint({
    summary: 'Create a new vehicle',
    description: 'Creates a new vehicle entry',
    tags: ['Vehicles'],
    responses: [
      { status: 201, description: 'Vehicle created' },
      { status: 400, description: 'Invalid input' },
    ],
  })
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  @Public()
  @ApiEndpoint({
    summary: 'Get all vehicles',
    description: 'Retrieve a list of all vehicles',
    tags: ['Vehicles'],
    responses: [{ status: 200, description: 'List of vehicles' }],
  })
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.vehiclesService.findAll(page, limit);
  }

  @Patch(':id')
  @Public()
  @ApiEndpoint({
    summary: 'Update vehicle by id',
    description: 'Update a vehicle by its id',
    tags: ['Vehicles'],
    responses: [
      { status: 200, description: 'Vehicle updated' },
      { status: 404, description: 'Vehicle not found' },
    ],
  })
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(+id, updateVehicleDto);
  }

  @Delete(':id')
  @Public()
  @ApiEndpoint({
    summary: 'Delete vehicle by id',
    description: 'Delete a vehicle by its id',
    tags: ['Vehicles'],
    responses: [
      { status: 200, description: 'Vehicle deleted' },
      { status: 404, description: 'Vehicle not found' },
    ],
  })
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(+id);
  }
}

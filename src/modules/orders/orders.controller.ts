import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Logger,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiEndpoint } from '../../swagger/docs';
import {
  Permissions,
  Public,
  Roles as RolesGuard,
} from 'src/decorators/decorators.decorator';
import { PermissionsTypes, Roles } from 'src/constants/role.enum';
@Controller({ path: 'orders', version: '1' })
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  private readonly logger = new Logger(OrdersController.name);
  @ApiEndpoint({
    summary: 'Create a new order',
    description: 'Creates a new order with the provided details.',
    tags: ['Orders'],
    bodyType: CreateOrderDto,
    responses: [
      {
        status: 201,
        description: 'Order created successfully',
      },
      {
        status: 400,
        description: 'Bad Request - Invalid input data',
      },
      {
        status: 401,
        description: 'Unauthorized - User not authenticated',
      },
      {
        status: 500,
        description: 'Internal Server Error - Unexpected error occurred',
      },
    ],
    authRequired: true,
  })
  @RolesGuard(Roles.USER)
  @Permissions(PermissionsTypes.WRITE)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() req: any) {
    this.logger.log(`Creating order for user: ${req.user.id}`);
    return this.ordersService.create(createOrderDto, req.user);
  }
  @ApiEndpoint({
    summary: 'Get all orders',
    description: 'Retrieves a paginated list of all orders.',
    tags: ['Orders'],
    queryParams: [
      {
        name: 'page',
        required: false,
        description: 'Page number for pagination',
        type: 'number',
        example: 1,
        default: 1,
      },
      {
        name: 'limit',
        required: false,
        description: 'Number of orders per page',
        type: 'number',
        example: 10,
        default: 10,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'List of orders retrieved successfully',
      },
      {
        status: 401,
        description: 'Unauthorized - User not authenticated',
      },
      {
        status: 500,
        description: 'Internal Server Error - Unexpected error occurred',
      },
    ],
    authRequired: true,
  })
  @RolesGuard(Roles.USER)
  @Permissions(PermissionsTypes.READ)
  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.ordersService.findAll(page, limit);
  }
  @ApiEndpoint({
    summary: 'Get order by ID',
    description: 'Retrieves a specific order by its ID.',
    tags: ['Orders'],
    pathParams: [
      {
        name: 'id',
        required: true,
        description: 'ID of the order to retrieve',
        type: 'number',
        example: 1,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Order retrieved successfully',
      },
      {
        status: 404,
        description: 'Order not found',
      },
      {
        status: 401,
        description: 'Unauthorized - User not authenticated',
      },
      {
        status: 500,
        description: 'Internal Server Error - Unexpected error occurred',
      },
    ],
    authRequired: true,
  })
  @RolesGuard(Roles.USER)
  @Permissions(PermissionsTypes.READ)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }
  @ApiEndpoint({
    summary: 'Update an order',
    description: 'Updates an existing order with the provided details.',
    tags: ['Orders'],
    pathParams: [
      {
        name: 'id',
        required: true,
        description: 'ID of the order to update',
        type: 'number',
        example: 1,
      },
    ],
    bodyType: UpdateOrderDto,
    responses: [
      {
        status: 200,
        description: 'Order updated successfully',
      },
      {
        status: 400,
        description: 'Bad Request - Invalid input data',
      },
      {
        status: 404,
        description: 'Order not found',
      },
      {
        status: 401,
        description: 'Unauthorized - User not authenticated',
      },
      {
        status: 500,
        description: 'Internal Server Error - Unexpected error occurred',
      },
    ],
    authRequired: true,
  })
  @RolesGuard(Roles.USER)
  @Permissions(PermissionsTypes.UPDATE)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @Req() req: any,
  ) {
    return this.ordersService.update(+id, updateOrderDto, req.user);
  }
  @ApiEndpoint({
    summary: 'Delete an order',
    description: 'Deletes an existing order by its ID.',
    tags: ['Orders'],
    pathParams: [
      {
        name: 'id',
        required: true,
        description: 'ID of the order to delete',
        type: 'number',
        example: 1,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Order deleted successfully',
      },
      {
        status: 404,
        description: 'Order not found',
      },
      {
        status: 401,
        description: 'Unauthorized - User not authenticated',
      },
      {
        status: 500,
        description: 'Internal Server Error - Unexpected error occurred',
      },
    ],
    authRequired: true,
  })
  @RolesGuard(Roles.USER)
  @Permissions(PermissionsTypes.DELETE)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}

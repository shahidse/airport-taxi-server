import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { ApiEndpoint } from 'src/swagger/docs';
import { PermissionsTypes, Roles } from '../../constants/role.enum';
import {
  Permissions,
  Roles as RolesGuard,
} from '../../decorators/decorators.decorator';
@Controller({ path: 'quotes', version: '1' })
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}
  @ApiEndpoint({
    summary: 'Quotes',
    description: 'Create quotes for users',
    tags: ['Quotes'],
    bodyType: CreateQuoteDto,
    responses: [{ status: 201, description: 'Quote created' }],
    authRequired: true,
  })
  @RolesGuard(Roles.USER)
  @Permissions(PermissionsTypes.WRITE)
  @Post()
  create(@Body() dto: CreateQuoteDto, @Req() req: any) {
    return this.quotesService.create(dto, req.user);
  }
  @ApiEndpoint({
    summary: 'Get all quotes',
    description: 'Retrieve all quotes for the authenticated user',
    tags: ['Quotes'],
    responses: [
      { status: 200, description: 'Quotes retrieved successfully' },
      {
        status: 401,
        description: 'Unauthorized - Bearer token missing or invalid',
      },
    ],
    authRequired: true,
    queryParams: [
      {
        name: 'page',
        required: false,
        description: 'Page number for pagination',
        type: 'number',
        example: 1,
      },
      {
        name: 'limit',
        required: false,
        description: 'Number of quotes per page',
        type: 'number',
        example: 10,
      },
    ],
  })
  @RolesGuard(Roles.USER)
  @Permissions(PermissionsTypes.READ)
  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Req() req: any,
  ) {
    return this.quotesService.findAll(req.user, +page, +limit);
  }
  @ApiEndpoint({
    summary: 'Get a quote by ID',
    description:
      'Retrieve a specific quote by its ID for the authenticated user',
    tags: ['Quotes'],
    responses: [
      { status: 200, description: 'Quote retrieved successfully' },
      { status: 404, description: 'Quote not found' },
      {
        status: 401,
        description: 'Unauthorized - Bearer token missing or invalid',
      },
    ],
    authRequired: true,
    pathParams: [
      {
        name: 'id',
        required: true,
        description: 'ID of the quote to retrieve',
        type: 'number',
        example: 1,
      },
    ],
  })
  @RolesGuard(Roles.USER)
  @Permissions(PermissionsTypes.READ)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.quotesService.findOne(+id, req.user);
  }
  @ApiEndpoint({
    summary: 'Update a quote',
    description: 'Update a specific quote by its ID for the authenticated user',
    tags: ['Quotes'],
    bodyType: UpdateQuoteDto,
    responses: [
      { status: 200, description: 'Quote updated successfully' },
      { status: 404, description: 'Quote not found' },
      {
        status: 401,
        description: 'Unauthorized - Bearer token missing or invalid',
      },
    ],
    authRequired: true,
    pathParams: [
      {
        name: 'id',
        required: true,
        description: 'ID of the quote to update',
        type: 'number',
        example: 1,
      },
    ],
  })
  @RolesGuard(Roles.USER)
  @Permissions(PermissionsTypes.UPDATE)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateQuoteDto,
    @Req() req: any,
  ) {
    return this.quotesService.update(+id, dto, req.user);
  }
  @ApiEndpoint({
    summary: 'Delete a quote',
    description: 'Delete a specific quote by its ID for the authenticated user',
    tags: ['Quotes'],
    responses: [
      { status: 200, description: 'Quote deleted successfully' },
      { status: 404, description: 'Quote not found' },
      {
        status: 401,
        description: 'Unauthorized - Bearer token missing or invalid',
      },
    ],
    authRequired: true,
    pathParams: [
      {
        name: 'id',
        required: true,
        description: 'ID of the quote to delete',
        type: 'number',
        example: 1,
      },
    ],
  })
  @RolesGuard(Roles.USER)
  @Permissions(PermissionsTypes.DELETE)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.quotesService.remove(+id, req.user);
  }
}

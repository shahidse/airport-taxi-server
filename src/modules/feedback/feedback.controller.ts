import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { ApiEndpoint } from 'src/swagger/docs';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}
  @ApiEndpoint({
    summary: 'Create Feedback',
    description: 'Create a new feedback for an order',
    tags: ['Feedback'],
    authRequired: true,
    bodyType: CreateFeedbackDto,
    responses: [
      { status: 201, description: 'Feedback created successfully' },
      { status: 422, description: 'Validation error' },
    ],
  })
  @Post()
  create(@Body() createFeedbackDto: CreateFeedbackDto, @Req() req: any) {
    return this.feedbackService.create(createFeedbackDto, req.user);
  }
  @ApiEndpoint({
    summary: 'Get All Feedback',
    description: 'Retrieve all feedback with pagination',
    tags: ['Feedback'],
    authRequired: true,
    queryParams: [
      {
        name: 'page',
        type: 'number',
        description: 'Page number for pagination',
        required: false,
        default: 1,
      },
      {
        name: 'limit',
        type: 'number',
        description: 'Number of feedback items per page',
        required: false,
        default: 10,
      },
    ],
    responses: [
      { status: 200, description: 'List of feedback' },
      { status: 404, description: 'No feedback found' },
    ],
  })
  @Get()
  findAll() {
    return this.feedbackService.findAll();
  }
  @ApiEndpoint({
    summary: 'Get Feedback by ID',
    description: 'Retrieve feedback by its ID',
    tags: ['Feedback'],
    pathParams: [
      {
        name: 'id',
        type: 'number',
        description: 'ID of the feedback to retrieve',
        required: true,
      },
    ],
    responses: [
      { status: 200, description: 'Feedback found' },
      { status: 404, description: 'Feedback not found' },
    ],
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbackService.findOne(+id);
  }
  @ApiEndpoint({
    summary: 'Update Feedback',
    description: 'Update feedback by its ID',
    tags: ['Feedback'],
    authRequired: true,
    pathParams: [
      {
        name: 'id',
        type: 'number',
        description: 'ID of the feedback to update',
        required: true,
      },
    ],
    bodyType: UpdateFeedbackDto,
    responses: [
      { status: 200, description: 'Feedback updated successfully' },
      { status: 404, description: 'Feedback not found' },
      { status: 422, description: 'Validation error' },
    ],
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFeedbackDto: UpdateFeedbackDto,
  ) {
    return this.feedbackService.update(+id, updateFeedbackDto);
  }
  @ApiEndpoint({
    summary: 'Delete Feedback',
    description: 'Delete feedback by its ID',
    tags: ['Feedback'],
    authRequired: true,
    pathParams: [
      {
        name: 'id',
        type: 'number',
        description: 'ID of the feedback to delete',
        required: true,
      },
    ],
    responses: [
      { status: 200, description: 'Feedback deleted successfully' },
      { status: 404, description: 'Feedback not found' },
    ],
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbackService.remove(+id);
  }
}

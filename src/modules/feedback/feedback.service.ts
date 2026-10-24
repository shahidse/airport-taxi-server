import { Inject, Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { CommonRepository } from '../database/repository/common_repository';
import { Feedback } from '../database/entities/feedback.entity';
import { Users } from '../database/entities/users.entity';
import { Order } from '../database/entities/order.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @Inject('FEEDBACK_REPOSITORY')
    private readonly feedBackRepo: CommonRepository<Feedback>,
    @Inject('USERS_REPOSITORY')
    private readonly userRepo: CommonRepository<Users>,
    @Inject('ORDER_REPOSITORY')
    private readonly orderRepo: CommonRepository<Order>,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto, userInfo: any) {
    // Validate order exists
    const order: any = await this.orderRepo.findOne({
      where: { id: createFeedbackDto.orderId },
    });
    const user: any = await this.userRepo.findOne({
      where: { id: userInfo.id },
    });
    const feedback = await this.feedBackRepo.create({
      order,
      user,
      ...createFeedbackDto,
    });
    return feedback;
  }

  async findAll(page: number = 1, limit: number = 10) {
    const total = await this.feedBackRepo.count();
    const data = await this.feedBackRepo.findAll({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['user', 'order'],
      order: { createdAt: 'DESC' },
    });
    return {
      data,
      total,
      page,
      limit,
      pageCount: Math.max(1, Math.ceil(total / limit)),
    };
  }

  async findOne(id: number) {
    return this.feedBackRepo.findOne({
      where: { id },
      relations: ['user', 'order'],
    });
  }

  async update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    await this.feedBackRepo.update({ id }, updateFeedbackDto);
    return this.feedBackRepo.findOne({
      where: { id },
      relations: ['user', 'order'],
    });
  }

  async remove(id: number) {
    await this.feedBackRepo.delete({ id });
    return { message: 'Feedback deleted successfully' };
  }
}

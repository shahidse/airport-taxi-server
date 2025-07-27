import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CommonRepository } from '../database/repository/common_repository';
import { Order } from '../database/entities/order.entity';
import { Users } from '../database/entities/users.entity';
import { Quote } from '../database/entities/quotes.entity';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private ordersRepository: CommonRepository<Order>,
    @Inject('USERS_REPOSITORY')
    private usersRepository: CommonRepository<Users>,
    @Inject('QUOTES_REPOSITORY')
    private quotesRepository: CommonRepository<Quote>,
  ) {}
  async create(createOrderDto: CreateOrderDto, userInfo: any) {
    const user = await this.usersRepository.findOne({
      where: { id: userInfo.id },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const quote: any = await this.quotesRepository.findOne({
      where: { id: createOrderDto.quoteId },
    });

    const order = await this.ordersRepository.create({
      user,
      quote,
      ...createOrderDto,
    });
    return order;
  }

  findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const take = limit;
    const orders = this.ordersRepository.findAll({
      skip,
      take,
      order: { updatedAt: 'DESC' },
    });
    return orders;
  }

  async findOne(id: number) {
    const order = await this.ordersRepository.findOne({ where: { id } });
    if (!order) {
      throw new Error(`Order with id ${id} not found`);
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto, userInfo: any) {
    const order = await this.ordersRepository.findOne({ where: { id } });
    if (!order) {
      throw new Error(`Order with id ${id} not found`);
    }
    if (userInfo.id !== order.user?.id) {
      throw new Error('You are not authorized to update this order');
    }
    const updatedOrder = await this.ordersRepository.update(id, updateOrderDto);
    if (!updatedOrder) {
      throw new Error(`Failed to update order with id ${id}`);
    }
    return updatedOrder;
  }

  async remove(id: number) {
    const order = await this.ordersRepository.findOne({ where: { id } });
    if (!order) {
      throw new Error(`Order with id ${id} not found`);
    }
    return this.ordersRepository.delete(id);
  }
}

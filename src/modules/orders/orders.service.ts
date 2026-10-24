import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CommonRepository } from '../database/repository/common_repository';
import { Order } from '../database/entities/order.entity';
import { Users } from '../database/entities/users.entity';
import { Quotes } from '../database/entities/quotes.entity';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private ordersRepository: CommonRepository<Order>,
    @Inject('USERS_REPOSITORY')
    private usersRepository: CommonRepository<Users>,
    @Inject('QUOTES_REPOSITORY')
    private quotesRepository: CommonRepository<Quotes>,
  ) {}

  async create(createOrderDto: CreateOrderDto, userInfo: any) {
    const user = await this.usersRepository.findOne({
      where: { id: userInfo.id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    let quote: any = null;
    if (createOrderDto.quoteId) {
      quote = await this.quotesRepository.findOne({
        where: { id: createOrderDto.quoteId },
      });
    }

    const bookingReference =
      createOrderDto.bookingReference ||
      `ATX-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const order = await this.ordersRepository.create({
      user,
      quote,
      ...createOrderDto,
      bookingReference,
      contactName: createOrderDto.contactName || user.fullName,
      contactEmail: createOrderDto.contactEmail || user.email,
      contactPhone: createOrderDto.contactPhone || user.phone,
    });
    return order;
  }

  async findAll(userInfo: any, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const take = limit;
    const isUserRole = String(userInfo.role || '').toLowerCase() === 'user';
    const whereClause: any = isUserRole ? { user: { id: userInfo.id } } : {};

    const total = await this.ordersRepository.count({
      where: whereClause,
    });

    const orders = await this.ordersRepository.findAll({
      where: whereClause,
      skip,
      take,
      relations: ['user', 'quote'],
      order: { createdAt: 'DESC' },
    });

    return {
      data: orders,
      total,
      page,
      limit,
      pageCount: Math.max(1, Math.ceil(total / limit)),
    };
  }

  async findOne(id: number, userInfo: any) {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['user', 'quote'],
    });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    const isUserRole = String(userInfo.role || '').toLowerCase() === 'user';
    if (isUserRole && order.user?.id !== userInfo.id) {
      throw new UnauthorizedException('You are not authorized to view this order');
    }

    return order;
  }

  async cancelOrder(id: number, userInfo: any) {
    const order = await this.findOne(id, userInfo);
    await this.ordersRepository.update({ id }, { status: 'cancelled' } as any);
    return this.findOne(id, userInfo);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto, userInfo: any) {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    const isUserRole = String(userInfo.role || '').toLowerCase() === 'user';
    if (isUserRole && userInfo.id !== order.user?.id) {
      throw new UnauthorizedException('You are not authorized to update this order');
    }

    await this.ordersRepository.update({ id }, updateOrderDto);
    return this.findOne(id, userInfo);
  }

  async remove(id: number) {
    const order = await this.ordersRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return this.ordersRepository.delete({ id });
  }
}

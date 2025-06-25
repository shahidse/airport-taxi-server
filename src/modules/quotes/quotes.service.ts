import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { Quote } from '../database/entities/quotes.entity';
import { CommonRepository } from '../database/repository/common_repository';
import { Users } from '../database/entities/users.entity';

@Injectable()
export class QuotesService {
  constructor(
    @Inject('QUOTES_REPOSITORY')
    private readonly quoteRepo: CommonRepository<Quote>,
    @Inject('USERS_REPOSITORY')
    private readonly userRepo: CommonRepository<Users>,
  ) {}

  async create(dto: CreateQuoteDto, userInfo: any): Promise<Quote> {
    const user = await this.userRepo.findOne({ where: { id: userInfo.id } });
    if (!user) throw new NotFoundException();
    const quote = this.quoteRepo.create({ ...dto, user });
    return quote;
  }

  async findAll(userInfo: any, page: any, limit: any): Promise<Quote[]> {
    return this.quoteRepo.findAll({
      where: { user: { id: userInfo.id } },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
      relations: ['user'],
    });
  }

  async findOne(id: number, userInfo: any): Promise<Quote> {
    const quote = await this.quoteRepo.findOne({
      where: { id, user: { id: userInfo.id } },
    });
    if (!quote) throw new NotFoundException('Quote not found');
    return quote;
  }

  async update(id: number, dto: UpdateQuoteDto, userInfo: any): Promise<Quote> {
    const updated = await this.quoteRepo.update(
      { id, user: { id: userInfo.id } },
      dto,
    );
    return updated;
  }

  async remove(id: number, userInfo: any): Promise<void> {
    await this.quoteRepo.delete({ id, user: { id: userInfo.id } });
  }
}

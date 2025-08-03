import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { Quotes } from '../database/entities/quotes.entity';
import { CommonRepository } from '../database/repository/common_repository';
import { Users } from '../database/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuotesService {
  constructor(
    @Inject('QUOTES_REPOSITORY')
    private quoteRepo: CommonRepository<Quotes>,
    @Inject('USERS_REPOSITORY')
    private userRepo: CommonRepository<Users>,
  ) {}

  async create(dto: CreateQuoteDto, userInfo: any): Promise<Quotes> {
    const user = await this.userRepo.findOne({ where: { id: userInfo.id } });
    if (!user) throw new NotFoundException('User not found');
    const quote = this.quoteRepo.create({ ...dto, user });
    return quote;
  }

  async findAll(
    userInfo: any,
    page: number,
    limit: number,
  ): Promise<{ data: Quotes[]; pageCount: number }> {
    const total = await this.quoteRepo.count();
    const data = await this.quoteRepo.findAll({
      where: { user: { id: userInfo.id } },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
      relations: ['user'],
    });
    const pageCount = Math.ceil(total / limit);
    return { data, pageCount };
  }

  async findOne(id: number, userInfo: any): Promise<Quotes> {
    if (!id) throw new NotFoundException('Quote ID is required');
    const quote = await this.quoteRepo.findOne({
      where: { id, user: { id: userInfo.id } },
    });
    if (!quote) throw new NotFoundException('Quote not found');
    return quote;
  }

  async update(id: number, dto: UpdateQuoteDto, userInfo: any): Promise<any> {
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

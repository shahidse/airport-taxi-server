import {
  Repository,
  FindOneOptions,
  FindOptionsWhere,
  DeepPartial,
  FindManyOptions,
  ObjectId,
} from 'typeorm';
import { ICommonRepository } from './common_repository.interface';
import { Logger } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class CommonRepository<T> implements ICommonRepository<T> {
  private readonly logger = new Logger(CommonRepository.name);
  constructor(private readonly repository: Repository<T>) {
    this.logger.log(`Repository injected into CommonRepository: ${repository}`);
  }

  // Create a new record
  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  // Find all records with optional filtering and projection
  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  // Find a single record with a filter
  async findOneBy(
    where: FindOptionsWhere<T> | FindOptionsWhere<T>[],
  ): Promise<T | undefined> {
    return this.repository.findOneBy(where);
  }
  async findOne(options: FindOneOptions<T>) {
    return this.repository.findOne(options);
  }
  // Count the number of records matching a condition
  async count(where?: FindManyOptions<T>): Promise<number> {
    return this.repository.count(where);
  }

  // Update a single record
  async update(filter: any, data: QueryDeepPartialEntity<T>): Promise<any> {
    return this.repository.update(filter, data);
  }
  // Update multiple records
  async updateMany(
    criteria:
      | string
      | number
      | string[]
      | FindOptionsWhere<T>
      | Date
      | ObjectId
      | number[]
      | Date[]
      | ObjectId[],
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<any> {
    return this.repository.update(criteria, partialEntity);
  }

  // Delete a record
  async delete(filter: any): Promise<any> {
    return await this.repository.delete(filter);
  }

  // Insert or update a record (upsert)
  async insertOrUpdate(
    where: FindOptionsWhere<T>,
    data: DeepPartial<T> | QueryDeepPartialEntity<T> | any,
  ): Promise<T> {
    const existingRecord = await this.repository.findOneBy(where);
    if (!existingRecord) {
      return this.create(data);
    }
    return this.update(where, data);
  }
}

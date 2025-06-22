import { DeepPartial } from 'typeorm';

// The primary key type (id) can vary depending on your entity.
// We'll assume it can be either a number or string, or you can replace it with any other type your entity uses.
export interface ICommonRepository<T> {
  // Create a new entity
  create(data: DeepPartial<T>): Promise<T>;

  //   // Find all entities with optional conditions
  findAll(where?: Partial<T>, relations?: string[]): Promise<T[]>;

  //   // Find an entity by its ID
  //   findById(id: any, relations?: string[]): Promise<T | null>;

  //   // Update an entity by its ID
  //   update(id: any, data: Partial<T>): Promise<T | null>;

  //   // Find one entity based on a filter
  //   findOne(where: Partial<T>, relations?: string[]): Promise<T | null>;

  //   // Find entities with pagination, sorting, and filtering
  //   find(
  //     where: Partial<T>,
  //     options: {
  //       page?: number;
  //       limit?: number;
  //       sort?: Record<string, 'ASC' | 'DESC'>;
  //       relations?: string[];
  //     },
  //   ): Promise<T[] | null>;

  //   // Count entities matching a condition
  //   count(where: Partial<T>): Promise<number>;

  //   // Delete an entity by its ID
  //   delete(id: any): Promise<void>;

  //   // Insert or update (upsert) an entity based on a condition
  //   insertOrUpdate(data: Partial<T>, where: Partial<T>): Promise<T>;
}

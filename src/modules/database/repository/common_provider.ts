import { Roles } from '../entities/roles.entity';
import { Users } from '../entities/users.entity';
import { CommonRepository } from './common_repository'; // Adjust the import path
import { DataSource, Repository } from 'typeorm';
export enum Schemas {
  USERS = 'Users',
  ROLES = 'Roles',
}
const schemas = {
  Users,
  Roles,
} as const;

export const createRepositoryProvider = (modelName: Schemas) => ({
  provide: `${modelName.toUpperCase()}_REPOSITORY`,
  useFactory: (dataSource: DataSource) => {
    const schema = schemas[modelName];
    const repository: Repository<any> = dataSource.getRepository(schema);
    return new CommonRepository<typeof schema>(repository);
  },
  inject: ['DATA_SOURCE'],
});

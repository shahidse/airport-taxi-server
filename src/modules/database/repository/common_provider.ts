import { Feedback } from '../entities/feedback.entity';
import { Order } from '../entities/order.entity';
import { Quotes } from '../entities/quotes.entity';
import { Roles } from '../entities/roles.entity';
import { Users } from '../entities/users.entity';
import { VehicleCategory } from '../entities/vehicleCategory.entity';
import { Vehicle } from '../entities/vehicles.entity';
import { CommonRepository } from './common_repository'; // Adjust the import path
import { DataSource, Repository } from 'typeorm';
export enum Schemas {
  USERS = 'Users',
  ROLES = 'Roles',
  QUOTES = 'Quotes',
  FEEDBACK = 'Feedback',
  ORDER = 'Order',
  VEHICLE_CATEGORY = 'VehicleCategory',
  VEHICLE = 'Vehicle',
}
const schemas = {
  Users,
  Roles,
  Quotes,
  Feedback,
  Order,
  VehicleCategory,
  Vehicle,
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

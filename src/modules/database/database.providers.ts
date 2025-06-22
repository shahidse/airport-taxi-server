import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: configService.get<string>('mysql.host'), // Get MySQL host from environment variable
        port: configService.get<number>('mysql.port'), // Get MySQL port from environment variable
        username: configService.get<string>('mysql.user'), // Get MySQL username from environment variable
        password: configService.get<string>('mysql.password'), // Get MySQL password from environment variable
        database: configService.get<string>('mysql.database'), // Get MySQL database name from environment variable
        entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Dynamically load entities from the current directory
        synchronize: true, // Automatically synchronize the database schema
      });

      return dataSource.initialize();
    },
    inject: [ConfigService],
  },
  {
    provide: 'ENTITY_MANAGER',
    useFactory: (dataSource: DataSource) => dataSource.manager,
    inject: ['DATA_SOURCE'],
  },
];

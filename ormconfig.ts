import { DataSource } from 'typeorm';
import * as path from 'path';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'airport_taxi',
  entities: [path.join(__dirname, 'src/modules/database/**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, 'src/migrations/*{.ts,.js}')], // Corrected path
  synchronize: false,
  logging: true,
});
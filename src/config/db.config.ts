import { DataSource, DataSourceOptions } from 'typeorm';
import { config as DotenvConfing } from 'dotenv';
DotenvConfing({ path: '.env' });

export const dbConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DB_PORT!,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME,
  database: process.env.DATABASE,
  entities: [__dirname + '/../**/entities/*{.ts,.js}'],
  migrations: [__dirname + '/../**/migrations/*{.ts,.js}'],
  migrationsRun: false,
  logging: true,
  synchronize: false,
};
export const AppDataSource = new DataSource(dbConfig);

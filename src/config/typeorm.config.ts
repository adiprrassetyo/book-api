/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5435,
  username: 'postgres',
  password: '123',
  database: 'book_api',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};

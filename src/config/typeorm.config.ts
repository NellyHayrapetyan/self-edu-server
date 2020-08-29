import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'ec2-54-158-122-162.compute-1.amazonaws.com',
  port: 5432,
  username: 'ntvjimutfnlper',
  ssl: true,
  password: '765eda005b191864848558a6a649ffeeab4c278a418584de4ecd8519152553ca',
  database: 'dadj7m1r1o7j94',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};

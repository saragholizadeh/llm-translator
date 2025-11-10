import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';

const mikroOrmConfig = defineConfig({
  dbName: 'translator',
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  driver: PostgreSqlDriver,
  entities: ['./dist/src/database/entities/**/*.js'],
  entitiesTs: ['./src/database/entities/**/*.ts'],
  migrations: {
    path: './src/database/migrations',
    pathTs: './src/database/migrations',
  },
  debug: true,
});

export default mikroOrmConfig;

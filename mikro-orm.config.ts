import { defineConfig } from '@mikro-orm/postgresql';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

export default defineConfig({
  driver: PostgreSqlDriver,
  dbName: process.env.DB_NAME || 'llm_translator',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  debug: true,

  entities: ['./dist/**/*.entity.js'],
  entitiesTs:
    process.env.NODE_ENV === 'development'
      ? ['./src/**/*.entity.ts']
      : undefined,

  migrations: {
    tableName: 'mikro_orm_migrations',
    path: './dist/src/database/migrations',
    pathTs: './src/database/migrations',
  },
});

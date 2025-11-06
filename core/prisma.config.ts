import { defineConfig } from 'prisma/config';
import { config } from 'dotenv';

// Load .env file
config();

export default defineConfig({
  schema: './src/infrastructure/database/prisma/schema.prisma',
  migrations: {
    path: './src/infrastructure/database/prisma/migrations',
  },
  engine: 'classic',
  datasource: {
    url: process.env.DATABASE_URL || '',
  },
});

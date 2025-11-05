import { cors } from '@elysiajs/cors';
import Elysia from 'elysia';

import { appConfig } from './configs/app.config';
import { publicRoutes } from './routes/public.route';
import { swaggerRoutes } from './routes/swagger.route';

const app = new Elysia()
  .use(
    cors({
      origin: appConfig.cors.allowedOrigins,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      credentials: appConfig.cors.credentials,
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  )
  .get('/', () => ({
    success: true,
    message: 'API is running',
    version: '1.0.0',
  }))
  .use(swaggerRoutes)
  .group('/api', (app) => app.use(publicRoutes))
  .listen(appConfig.port);

console.log(`🚀 API is running at http://${app.server?.hostname}:${app.server?.port}`);
console.log(`📚 API Documentation: http://${app.server?.hostname}:${app.server?.port}/docs`);
console.log(`🔍 Health Check: http://${app.server?.hostname}:${app.server?.port}/health`);

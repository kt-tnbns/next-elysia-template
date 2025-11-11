import { cors } from '@elysiajs/cors';
import Elysia from 'elysia';

import { appConfig } from './configs/app.config';
import { APP_NAME, APP_VERSION } from './shared/constants/base.constants';
import { logger } from './lib/logger';
import { errorHandler, requestLogger } from './middleware';
import { healthRoutes } from './routes';
import { swaggerRoutes } from './routes/swagger.route';

/**
 * Main application setup with clean architecture
 */

const app = new Elysia()
  // CORS middleware
  .use(
    cors({
      origin: appConfig.cors.allowedOrigins,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      credentials: appConfig.cors.credentials,
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  )
  // Request logging middleware
  .use(requestLogger)
  // API documentation
  .use(swaggerRoutes)
  // Root endpoint
  .get('/', () => ({
    success: true,
    message: `${APP_NAME} is running`,
    version: APP_VERSION,
  }))
  // API routes
  .group('/api', (app) => app.use(healthRoutes))
  // Error handling middleware (must be last)
  .onError(errorHandler)
  .listen(appConfig.port);

logger.info(`🚀 ${APP_NAME} v${APP_VERSION} is running`, {
  url: `http://${app.server?.hostname}:${app.server?.port}`,
  environment: process.env.NODE_ENV || 'development',
});
logger.info(`📚 API Documentation: http://${app.server?.hostname}:${app.server?.port}/docs`);
logger.info(`🔍 Health Check: http://${app.server?.hostname}:${app.server?.port}/api/health`);

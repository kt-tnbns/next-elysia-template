import { Elysia } from 'elysia';
import { logger } from '../lib/logger';

/**
 * Request logger middleware
 * Logs all incoming requests and responses
 */
export const requestLogger = new Elysia()
  .onRequest(({ request, path }) => {
    logger.info('Incoming request', {
      method: request.method,
      path,
      userAgent: request.headers.get('user-agent'),
    });
  })
  .onAfterHandle(({ request, path, response }) => {
    logger.debug('Request completed', {
      method: request.method,
      path,
      responseType: typeof response,
    });
  });

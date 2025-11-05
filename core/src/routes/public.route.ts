import { Elysia } from 'elysia';
import { checkDatabaseConnection } from '../lib/db';

export const publicRoutes = new Elysia()
  .get(
    '/health',
    async () => {
      const dbHealthy = await checkDatabaseConnection();

      return {
        success: true,
        status: dbHealthy ? 'healthy' : 'degraded',
        message: dbHealthy ? 'API is healthy' : 'API is running but database connection failed',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        services: {
          api: 'healthy',
          database: dbHealthy ? 'healthy' : 'unhealthy',
        },
      };
    },
    {
      detail: {
        tags: ['Health'],
        summary: 'Health check',
        description: 'Returns the health status of the API and database',
      },
    }
  )
  .get(
    '/info',
    () => ({
      success: true,
      data: {
        name: 'API',
        version: '1.0.0',
        description: 'ElysiaJS-based API',
        features: ['OpenAPI Documentation'],
        endpoints: {
          health: '/public/health',
          docs: '/public/docs',
          swagger: '/public/docs/json',
        },
      },
    }),
    {
      detail: {
        tags: ['Info'],
        summary: 'API information',
        description: 'Returns information about the API',
      },
    }
  );

import { Elysia } from 'elysia';

export const publicRoutes = new Elysia()
  .get(
    '/health',
    () => ({
      success: true,
      message: 'API is healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    }),
    {
      detail: {
        tags: ['Health'],
        summary: 'Health check',
        description: 'Returns the health status of the API',
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

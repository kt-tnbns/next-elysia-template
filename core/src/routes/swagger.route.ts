import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';

import { appConfig } from '../configs/app.config';

const createSwaggerRoutes = (): any => {
  return new Elysia().use(
    swagger({
      path: '/docs',
      documentation: {
        info: {
          title: 'API - Routes',
          version: '1.0.0',
          description: 'ElysiaJS-based API Routes with OpenAPI documentation',
        },
        tags: [
          { name: 'Health', description: 'Health check endpoints' },
          { name: 'Info', description: 'information endpoints' },
        ],
        servers: [
          {
            url: `http://localhost:${appConfig.port}`,
            description: 'Development server - API',
          },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
          },
        },
        security: [{ bearerAuth: [] }],
      },
    })
  );
};

export const swaggerRoutes = createSwaggerRoutes();

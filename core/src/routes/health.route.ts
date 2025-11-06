import { Elysia } from 'elysia';
import { HealthService } from '../services';

/**
 * Health and system info routes
 */

export const healthRoutes = new Elysia({ prefix: '/health' })
  .get(
    '/',
    async () => {
      return await HealthService.checkHealth();
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
    () => {
      return HealthService.getSystemInfo();
    },
    {
      detail: {
        tags: ['Health'],
        summary: 'System information',
        description: 'Returns information about the API system',
      },
    }
  );

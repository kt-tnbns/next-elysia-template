import { checkDatabaseConnection } from '../infrastructure/database';
import { APP_NAME, APP_VERSION } from '../configs/constants';

/**
 * Health service
 * Business logic for health checks and system status
 */

export interface HealthCheckResult {
  success: boolean;
  status: 'healthy' | 'degraded' | 'unhealthy';
  message: string;
  timestamp: string;
  version: string;
  services: {
    api: 'healthy' | 'unhealthy';
    database: 'healthy' | 'unhealthy';
  };
}

export interface SystemInfo {
  success: boolean;
  data: {
    name: string;
    version: string;
    description: string;
    features: string[];
    endpoints: Record<string, string>;
  };
}

export class HealthService {
  /**
   * Perform comprehensive health check
   */
  static async checkHealth(): Promise<HealthCheckResult> {
    const dbHealthy = await checkDatabaseConnection();
    const apiHealthy = true; // API is healthy if this code is running

    const allHealthy = dbHealthy && apiHealthy;
    const status = allHealthy ? 'healthy' : dbHealthy ? 'degraded' : 'unhealthy';

    return {
      success: true,
      status,
      message: allHealthy
        ? 'All services are operational'
        : dbHealthy
        ? 'API is running but database connection failed'
        : 'System is unhealthy',
      timestamp: new Date().toISOString(),
      version: APP_VERSION,
      services: {
        api: apiHealthy ? 'healthy' : 'unhealthy',
        database: dbHealthy ? 'healthy' : 'unhealthy',
      },
    };
  }

  /**
   * Get system information
   */
  static getSystemInfo(): SystemInfo {
    return {
      success: true,
      data: {
        name: APP_NAME,
        version: APP_VERSION,
        description: 'ElysiaJS-based API with clean architecture',
        features: [
          'OpenAPI Documentation',
          'PostgreSQL Database',
          'Prisma ORM',
          'Type-safe validation',
          'Error handling',
          'Request logging',
        ],
        endpoints: {
          health: '/api/health',
          info: '/api/info',
          docs: '/docs',
          swagger: '/docs/json',
        },
      },
    };
  }
}

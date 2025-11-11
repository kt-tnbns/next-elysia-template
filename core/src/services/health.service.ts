import { checkDatabaseConnection } from '../infrastructure/database';
import { APP_NAME, APP_VERSION } from '../shared/constants/base.constants';
import { HealthCheckResult, SystemInfo } from '../shared/types/health.type';
import { HealthStatus, ServiceStatus } from '../shared/enums';

/**
 * Health service
 * Business logic for health checks and system status
 */
export class HealthService {
  /**
   * Perform comprehensive health check
   */
  static async checkHealth(): Promise<HealthCheckResult> {
    const dbHealthy = await checkDatabaseConnection();
    const apiHealthy = true; // API is healthy if this code is running

    const allHealthy = dbHealthy && apiHealthy;
    const status = allHealthy
      ? HealthStatus.HEALTHY
      : dbHealthy
        ? HealthStatus.DEGRADED
        : HealthStatus.UNHEALTHY;

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
        api: apiHealthy ? ServiceStatus.HEALTHY : ServiceStatus.UNHEALTHY,
        database: dbHealthy ? ServiceStatus.HEALTHY : ServiceStatus.UNHEALTHY,
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

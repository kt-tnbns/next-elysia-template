import { HealthStatus, ServiceStatus } from '../enums';

export interface HealthCheckResult {
  success: boolean;
  status: HealthStatus;
  message: string;
  timestamp: string;
  version: string;
  services: {
    api: ServiceStatus;
    database: ServiceStatus;
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

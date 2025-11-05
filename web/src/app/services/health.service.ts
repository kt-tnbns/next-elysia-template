import { api } from '@/lib/api';
import { HealthResponse } from '@/app/types/health.type';

export const healthService = {
  check: () => api.get<HealthResponse>('/api/health'),
};

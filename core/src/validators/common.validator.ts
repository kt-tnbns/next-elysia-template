import { z } from 'zod';

/**
 * Common validation schemas
 */

// ID validation
export const idSchema = z.object({
  id: z.coerce.number().int().positive(),
});

// Pagination validation
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

// Search validation
export const searchSchema = z.object({
  search: z.string().min(1).max(255).optional(),
});

// Date range validation
export const dateRangeSchema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

// UUID validation
export const uuidSchema = z.object({
  id: z.string().uuid(),
});

/**
 * Export types inferred from schemas
 */
export type IdParams = z.infer<typeof idSchema>;
export type PaginationParams = z.infer<typeof paginationSchema>;
export type SearchParams = z.infer<typeof searchSchema>;
export type DateRangeParams = z.infer<typeof dateRangeSchema>;
export type UuidParams = z.infer<typeof uuidSchema>;

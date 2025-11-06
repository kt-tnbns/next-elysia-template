import type { ApiSuccessResponse, ApiErrorResponse, PaginationMeta } from '../types';

/**
 * Standardized response helpers
 */

export class ResponseHelper {
  /**
   * Success response with data
   */
  static success<T>(data: T, message?: string): ApiSuccessResponse<T> {
    return {
      success: true,
      data,
      ...(message && { message }),
    };
  }

  /**
   * Success response with pagination
   */
  static successWithPagination<T>(
    data: T,
    meta: PaginationMeta,
    message?: string
  ): ApiSuccessResponse<T> {
    return {
      success: true,
      data,
      meta,
      ...(message && { message }),
    };
  }

  /**
   * Success response without data (for operations like delete)
   */
  static successMessage(message: string): ApiSuccessResponse {
    return {
      success: true,
      message,
    };
  }

  /**
   * Error response
   */
  static error(message: string, statusCode: number, details?: any): ApiErrorResponse {
    return {
      success: false,
      error: {
        message,
        statusCode,
        ...(details && { details }),
      },
    };
  }

  /**
   * Calculate pagination metadata
   */
  static calculatePagination(
    total: number,
    page: number,
    limit: number
  ): PaginationMeta {
    const totalPages = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  }
}

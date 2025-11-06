import type { ErrorHandler } from 'elysia';
import { AppError } from '../lib/errors';
import { logger } from '../lib/logger';

/**
 * Global error handler function
 * Catches all errors and returns standardized error responses
 */
export const errorHandler: ErrorHandler = ({ error, code, set }) => {
  // Handle AppError instances
  if (error instanceof AppError) {
    set.status = error.statusCode;

    logger.warn('Application error', {
      statusCode: error.statusCode,
      message: error.message,
      isOperational: error.isOperational,
    });

    return {
      success: false,
      error: {
        message: error.message,
        statusCode: error.statusCode,
      },
    };
  }

  // Handle Elysia validation errors
  if (code === 'VALIDATION') {
    set.status = 400;

    logger.warn('Validation error', {
      error: error.message,
    });

    return {
      success: false,
      error: {
        message: 'Validation error',
        statusCode: 400,
        details: error.message,
      },
    };
  }

  // Handle NOT_FOUND
  if (code === 'NOT_FOUND') {
    set.status = 404;

    return {
      success: false,
      error: {
        message: 'Endpoint not found',
        statusCode: 404,
      },
    };
  }

  // Handle unexpected errors
  logger.error('Unexpected error', error, {
    code,
  });

  set.status = 500;

  return {
    success: false,
    error: {
      message: process.env.NODE_ENV === 'production'
        ? 'Internal server error'
        : error.message || 'An unexpected error occurred',
      statusCode: 500,
    },
  };
};

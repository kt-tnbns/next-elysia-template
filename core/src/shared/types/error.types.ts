/**
 * Error-related types
 */

export interface ErrorDetails {
  field?: string;
  message: string;
  code?: string;
}

export interface ValidationErrorDetails {
  errors: ErrorDetails[];
}

export type ErrorResponse = {
  success: false;
  error: {
    message: string;
    statusCode: number;
    details?: ValidationErrorDetails | any;
  };
  timestamp?: string;
  path?: string;
};

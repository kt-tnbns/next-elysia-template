import { get } from 'env-var';

export const appConfig = {
  env: get('NODE_ENV').required().asString(),
  port: get('PORT').default(3000).asInt(),
  cors: {
    allowedOrigins: get('CORS_ALLOWED_ORIGINS').default('*').asArray(','),
    credentials: get('CORS_CREDENTIALS').default('false').asBool(),
  },
};

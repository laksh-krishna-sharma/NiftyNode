const appConfig = {

  JWT_SECRET: process.env.JWT_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
  REDIS_URL: process.env.REDIS_URL,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  CEREBRAS_API_KEY: process.env.CEREBRAS_API_KEY,

  PORT: parseInt(process.env.PORT || '3000'),
};

export default appConfig;
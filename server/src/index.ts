import Fastify from 'fastify';
import authRoutes from './auth/routes/authRoutes';
import kiteAuthRoutes from './kite-auth/routes/kiteAuthRoutes';
import logger from './utils/logger';
import { setSuccess } from './utils/responseHelper';
import appConfig from './config';

const fastify = Fastify({
  logger: false,
});

fastify.register(authRoutes);
fastify.register(kiteAuthRoutes);

fastify.addHook('onRequest', (request, reply, done) => {
  logger.debug(`${request.method} ${request.url} - ${request.ip}`);
  done();
});

fastify.addHook('onResponse', (request, reply, done) => {
  logger.debug(`${request.method} ${request.url} - ${reply.statusCode}`);
  done();
});

fastify.get('/', async (request, reply) => {
  logger.info('Health check endpoint called');
  return setSuccess(reply, { message: 'TradeMCP API is running!' });
});

const start = async () => {
  try {
    await fastify.listen({ port: appConfig.PORT, host: '0.0.0.0' });
    logger.info(`Server is running on http://localhost:${appConfig.PORT}`);
  } catch (err) {
    logger.error(`Failed to start server: ${err}`);
    process.exit(1);
  }
};

start();
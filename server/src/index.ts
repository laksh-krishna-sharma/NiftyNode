import Fastify from 'fastify';
import cors from '@fastify/cors';
import authRoutes from './auth/routes/authRoutes';
import kiteAuthRoutes from './kite-auth/routes/kiteAuthRoutes';
import kiteOrderRoutes from './kite-order/routes/kiteOrderRoutes';
import kiteProfileRoutes from './kite-profile/routes/kiteProfileRoutes';
import logger from './utils/logger';
import { setSuccess } from './utils/responseHelper';
import appConfig from './config';

const fastify = Fastify({
  logger: false,
});

const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];

await fastify.register(cors, {
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) {
      cb(null, true);
      return;
    }

    cb(new Error('Not allowed'), false);
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400,
});

fastify.addHook('onSend', (request, reply, payload, done) => {
  const origin = request.headers.origin;
  if (!origin || allowedOrigins.includes(origin)) {
    reply.header('Access-Control-Allow-Origin', origin || allowedOrigins[0]);
    reply.header('Access-Control-Allow-Credentials', 'true');
  }
  reply.header('Vary', 'Origin');
  done(null, payload);
});

fastify.register(authRoutes);
fastify.register(kiteAuthRoutes);
fastify.register(kiteOrderRoutes);
fastify.register(kiteProfileRoutes);

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
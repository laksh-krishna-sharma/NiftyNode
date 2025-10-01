import type { FastifyInstance } from 'fastify';
import { registerUser, loginUser } from '../services/authService';
import type { RegisterData, LoginData } from '../types';
import logger from '../../utils/logger';
import { setBadRequest, setUnauthorized, setSuccess } from '../../utils/responseHelper';

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/auth/register', async (request, reply) => {
    try {
      const { fullName, email, password } = request.body as RegisterData;

      logger.info(`Registration request received for email: ${email}`);

      if (!fullName || !email || !password) {
        logger.warn('Registration failed: Missing required fields');
        return setBadRequest(reply, 'All fields are required');
      }

      const result = await registerUser({ fullName, email, password });

      logger.info(`Registration successful for email: ${email}`);
      return reply.code(201).send({
        status: "Success",
        data: result,
      });
    } catch (error: any) {
      const email = (request.body as any)?.email || 'unknown';
      logger.error(`Registration error for email ${email}: ${error.message}`);
      return setBadRequest(reply, error.message);
    }
  });

  fastify.post('/auth/login', async (request, reply) => {
    try {
      const { email, password } = request.body as LoginData;

      logger.info(`Login request received for email: ${email}`);

      if (!email || !password) {
        logger.warn('Login failed: Missing email or password');
        return setBadRequest(reply, 'Email and password are required');
      }

      const result = await loginUser({ email, password });

      logger.info(`Login successful for email: ${email}`);
      return setSuccess(reply, result);
    } catch (error: any) {
      const email = (request.body as any)?.email || 'unknown';
      logger.error(`Login error for email ${email}: ${error.message}`);
      return setUnauthorized(reply, error.message);
    }
  });
}
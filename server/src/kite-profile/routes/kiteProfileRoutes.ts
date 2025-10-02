import type { FastifyInstance } from 'fastify';
import kiteProfileService from '../services/kiteProfileService';
import type { ProfileRequest } from '../types';
import logger from '../../utils/logger';
import { setBadRequest, setSuccess } from '../../utils/responseHelper';

export default async function kiteProfileRoutes(fastify: FastifyInstance) {
  // Get user profile
  fastify.get('/kite/profile', async (request, reply) => {
    try {
      const { apiKey } = request.query as ProfileRequest;

      logger.info(`Profile request for apiKey: ${apiKey}`);

      if (!apiKey) {
        logger.warn('Profile request failed: Missing API key');
        return setBadRequest(reply, 'API key is required');
      }

      const result = await kiteProfileService.getProfile({ apiKey });

      logger.info(`Profile retrieved for user: ${result.user_id}`);
      return setSuccess(reply, result);
    } catch (error: any) {
      logger.error(`Profile retrieval error: ${error.message}`);
      return setBadRequest(reply, error.message);
    }
  });
}
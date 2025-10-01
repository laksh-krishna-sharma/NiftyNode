import type { FastifyInstance } from 'fastify';
import kiteAuthService from '../services/kiteAuthService';
import type { KiteLoginRequest, KiteSessionRequest } from '../types';
import logger from '../../utils/logger';
import { setBadRequest, setSuccess } from '../../utils/responseHelper';

export default async function kiteAuthRoutes(fastify: FastifyInstance) {
  // Generate login URL
  fastify.post('/kite/login', async (request, reply) => {
    try {
      const { apiKey, apiSecret } = request.body as KiteLoginRequest;

      logger.info(`Kite login request for API key: ${apiKey}`);

      if (!apiKey || !apiSecret) {
        logger.warn('Kite login failed: Missing API key or secret');
        return setBadRequest(reply, 'API key and secret are required');
      }

      const result = await kiteAuthService.generateLoginUrl(apiKey, apiSecret);

      logger.info(`Kite login URL generated for API key: ${apiKey}`);
      return setSuccess(reply, result);
    } catch (error: any) {
      logger.error(`Kite login error: ${error.message}`);
      return setBadRequest(reply, error.message);
    }
  });

  // Generate access token from request token
  fastify.post('/kite/session', async (request, reply) => {
    try {
      const { sessionId, requestToken, apiKey, apiSecret } = request.body as KiteSessionRequest;

      logger.info(`Kite session request for API key: ${apiKey}`);

      if (!sessionId || !requestToken || !apiKey || !apiSecret) {
        logger.warn('Kite session failed: Missing required fields');
        return setBadRequest(reply, 'Session ID, request token, API key, and secret are required');
      }

      const result = await kiteAuthService.generateAccessToken(sessionId, requestToken);

      logger.info(`Kite session generated for API key: ${apiKey}`);
      return setSuccess(reply, result);
    } catch (error: any) {
      logger.error(`Kite session error: ${error.message}`);
      return setBadRequest(reply, error.message);
    }
  });

  // Get stored access token
  fastify.get('/kite/token/:apiKey', async (request, reply) => {
    try {
      const { apiKey } = request.params as { apiKey: string };

      logger.info(`Kite token request for API key: ${apiKey}`);

      const accessToken = await kiteAuthService.getStoredAccessToken(apiKey);

      if (!accessToken) {
        return setBadRequest(reply, 'Access token not found or expired');
      }

      return setSuccess(reply, { accessToken });
    } catch (error: any) {
      logger.error(`Kite token retrieval error: ${error.message}`);
      return setBadRequest(reply, error.message);
    }
  });

  // Handle Kite callback
  fastify.get('/kite/callback', async (request, reply) => {
    try {
      const query = request.query as any;

      logger.info(`Kite callback received with params: ${JSON.stringify(query)}`);

      const { action, type, status, request_token } = query;

      if (status !== 'success' || !request_token) {
        logger.warn(`Kite callback failed: status=${status}, request_token=${request_token}`);
        return setBadRequest(reply, 'Authentication failed or missing request token');
      }

      // Return the callback data for frontend to process
      return setSuccess(reply, {
        action,
        type,
        status,
        requestToken: request_token
      });
    } catch (error: any) {
      logger.error(`Kite callback error: ${error.message}`);
      return setBadRequest(reply, error.message);
    }
  });

  // Handle trade callback (alternative route)
  fastify.get('/trade/callback', async (request, reply) => {
    try {
      const query = request.query as any;

      logger.info(`Trade callback received with params: ${JSON.stringify(query)}`);

      const { action, type, status, request_token } = query;

      if (status !== 'success' || !request_token) {
        logger.warn(`Trade callback failed: status=${status}, request_token=${request_token}`);
        return setBadRequest(reply, 'Authentication failed or missing request token');
      }

      // Return the callback data for frontend to process
      return setSuccess(reply, {
        action,
        type,
        status,
        requestToken: request_token
      });
    } catch (error: any) {
      logger.error(`Trade callback error: ${error.message}`);
      return setBadRequest(reply, error.message);
    }
  });
}
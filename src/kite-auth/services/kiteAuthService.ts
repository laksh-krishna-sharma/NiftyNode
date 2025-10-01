import { KiteConnect } from 'kiteconnect';
import { v4 as uuidv4 } from 'uuid';
import type { KiteCredentials, KiteLoginResponse, KiteSessionResponse } from '../types';
import logger from '../../utils/logger';
import redisClient from '../../utils/redis_conf';

class KiteAuthService {
  private sessions: Map<string, KiteCredentials> = new Map();

  async generateLoginUrl(apiKey: string, apiSecret: string): Promise<KiteLoginResponse> {
    try {
      const kc = new KiteConnect({ api_key: apiKey });
      const loginUrl = kc.getLoginURL();

      const sessionId = uuidv4();
      this.sessions.set(sessionId, { apiKey, apiSecret });

      logger.info(`Generated login URL for API key: ${apiKey}, session: ${sessionId}`);

      return {
        loginUrl,
        sessionId
      };
    } catch (error: any) {
      logger.error(`Error generating login URL: ${error.message}`);
      throw new Error('Failed to generate login URL');
    }
  }

  async generateAccessToken(sessionId: string, requestToken: string): Promise<KiteSessionResponse> {
    try {
      logger.info(`Attempting to generate access token for session: ${sessionId}`);

      const credentials = this.sessions.get(sessionId);
      if (!credentials) {
        logger.error(`Session not found: ${sessionId}`);
        throw new Error('Invalid or expired session ID. Please restart the login process.');
      }

      const { apiKey, apiSecret } = credentials;
      logger.info(`Found credentials for API key: ${apiKey}`);

      const kc = new KiteConnect({ api_key: apiKey });

      logger.info(`Calling Kite generateSession with request token: ${requestToken.substring(0, 10)}...`);
      const response = await kc.generateSession(requestToken, apiSecret);
      kc.setAccessToken(response.access_token);

      logger.info(`Kite session generated successfully for API key: ${apiKey}`);

      // Store access token in Redis with 24 hour expiry
      const redisKey = `kite_access_token:${apiKey}`;
      await redisClient.setex(redisKey, 24 * 60 * 60, response.access_token);
      logger.info(`Access token stored in Redis for API key: ${apiKey}`);

      // Clean up session
      this.sessions.delete(sessionId);

      logger.info(`Generated access token for API key: ${apiKey}`);

      return {
        accessToken: response.access_token,
        publicToken: response.public_token,
        loginTime: response.login_time,
        userId: response.user_id,
        email: response.email,
        userName: response.user_name,
        userShortName: response.user_shortname,
        broker: response.broker,
        exchanges: response.exchanges,
        products: response.products,
        orderTypes: response.order_types,
        userType: response.user_type,
        apiKey: response.api_key,
        accessTokenExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      };
    } catch (error: any) {
      logger.error(`Error generating access token for session ${sessionId}: ${error.message}. Stack: ${error.stack}`);

      // Provide more specific error messages
      if (error.message.includes('Invalid session ID')) {
        throw new Error('Invalid or expired session ID. Please restart the login process.');
      } else if (error.message.includes('request_token')) {
        throw new Error('Invalid or expired request token. Please try logging in again.');
      } else if (error.message.includes('api_key')) {
        throw new Error('Invalid API key or secret. Please check your credentials.');
      } else {
        throw new Error(`Failed to generate access token: ${error.message}`);
      }
    }
  }

  async getStoredAccessToken(apiKey: string): Promise<string | null> {
    try {
      const redisKey = `kite_access_token:${apiKey}`;
      const accessToken = await redisClient.get(redisKey);
      return accessToken;
    } catch (error: any) {
      logger.error(`Error retrieving access token from Redis: ${error.message}`);
      return null;
    }
  }
}

export default new KiteAuthService();
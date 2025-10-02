import { KiteConnect } from 'kiteconnect';
import type { ProfileRequest, ProfileResponse } from '../types';
import logger from '../../utils/logger';
import redisClient from '../../utils/redis_conf';

class KiteProfileService {
  async getProfile(profileData: ProfileRequest): Promise<ProfileResponse> {
    try {
      const { apiKey } = profileData;

      logger.info(`Getting profile for apiKey: ${apiKey}`);

      // Get access token from Redis
      const accessToken = await this.getAccessToken(apiKey);
      if (!accessToken) {
        throw new Error('Access token not found. Please authenticate first.');
      }

      // Initialize Kite Connect with API key and set access token
      const kc = new KiteConnect({ api_key: apiKey });
      kc.setAccessToken(accessToken);

      // Get user profile
      const profile = await kc.getProfile();

      logger.info(`Profile retrieved successfully for user: ${profile.user_id}`);

      return profile;
    } catch (error: any) {
      logger.error(`Error getting profile: ${error.message}`);
      throw new Error(`Failed to get profile: ${error.message}`);
    }
  }

  private async getAccessToken(apiKey: string): Promise<string | null> {
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

export default new KiteProfileService();
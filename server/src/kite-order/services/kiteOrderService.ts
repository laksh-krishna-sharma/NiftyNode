import { KiteConnect } from 'kiteconnect';
import type { PlaceOrderRequest, OrderResponse, OrderBookRequest, OrderBookResponse, PositionsRequest, PositionsResponse } from '../types';
import logger from '../../utils/logger';
import redisClient from '../../utils/redis_conf';

class KiteOrderService {
  async placeOrder(orderData: PlaceOrderRequest): Promise<OrderResponse> {
    try {
      const { apiKey, tradingSymbol, quantity, transactionType, exchange = "NSE", product = "CNC", orderType = "MARKET" } = orderData;

      logger.info(`Placing ${transactionType} order for ${tradingSymbol}, quantity: ${quantity}, apiKey: ${apiKey}`);

      // Get access token from Redis
      const accessToken = await this.getAccessToken(apiKey);
      if (!accessToken) {
        throw new Error('Access token not found. Please authenticate first.');
      }

      // Initialize Kite Connect with API key and set access token
      const kc = new KiteConnect({ api_key: apiKey });
      kc.setAccessToken(accessToken);

      // Place the order with proper typing
      const orderResponse = await kc.placeOrder("regular", {
        exchange: exchange as any, // Kite expects specific exchange types
        tradingsymbol: tradingSymbol,
        transaction_type: transactionType,
        quantity,
        product: product as any, // Kite expects specific product types
        order_type: orderType as any // Kite expects specific order types
      });

      logger.info(`Order placed successfully: ${JSON.stringify(orderResponse)}`);

      return {
        orderId: orderResponse.order_id,
        status: 'success',
        message: 'Order placed successfully'
      };

    } catch (error: any) {
      logger.error(`Error placing order: ${error.message}`);
      throw new Error(`Failed to place order: ${error.message}`);
    }
  }

  async getOrderBook(orderData: OrderBookRequest): Promise<OrderBookResponse> {
    try {
      const { apiKey } = orderData;

      logger.info(`Getting order book for apiKey: ${apiKey}`);

      const accessToken = await this.getAccessToken(apiKey);
      if (!accessToken) {
        throw new Error('Access token not found. Please authenticate first.');
      }

      const kc = new KiteConnect({ api_key: apiKey });
      kc.setAccessToken(accessToken);

      const orders = await kc.getOrders();

      logger.info(`Retrieved ${orders.length} orders from order book`);

      return {
        orders
      };

    } catch (error: any) {
      logger.error(`Error getting order book: ${error.message}`);
      throw new Error(`Failed to get order book: ${error.message}`);
    }
  }

  async getPositions(positionsData: PositionsRequest): Promise<PositionsResponse> {
    try {
      const { apiKey } = positionsData;

      logger.info(`Getting positions for apiKey: ${apiKey}`);

      const accessToken = await this.getAccessToken(apiKey);
      if (!accessToken) {
        throw new Error('Access token not found. Please authenticate first.');
      }

      const kc = new KiteConnect({ api_key: apiKey });
      kc.setAccessToken(accessToken);

      const positions = await kc.getPositions();

      logger.info(`Retrieved positions: ${positions.net.length} net, ${positions.day.length} day positions`);

      return positions;

    } catch (error: any) {
      logger.error(`Error getting positions: ${error.message}`);
      throw new Error(`Failed to get positions: ${error.message}`);
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

export default new KiteOrderService();
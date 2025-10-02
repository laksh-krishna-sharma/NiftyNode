import type { FastifyInstance } from 'fastify';
import kiteOrderService from '../services/kiteOrderService';
import type { PlaceOrderRequest, OrderBookRequest, PositionsRequest } from '../types';
import logger from '../../utils/logger';
import { setBadRequest, setSuccess } from '../../utils/responseHelper';

export default async function kiteOrderRoutes(fastify: FastifyInstance) {
  // Place an order (Buy/Sell)
  fastify.post('/kite/order/place', async (request, reply) => {
    try {
      const { apiKey, tradingSymbol, quantity, transactionType, exchange, product, orderType } = request.body as PlaceOrderRequest;

      logger.info(`Order request: ${transactionType} ${quantity} ${tradingSymbol} on ${exchange || 'NSE'}`);

      if (!apiKey || !tradingSymbol || !quantity || !transactionType) {
        logger.warn('Order placement failed: Missing required fields');
        return setBadRequest(reply, 'API key, trading symbol, quantity, and transaction type are required');
      }

      if (!['BUY', 'SELL'].includes(transactionType)) {
        logger.warn('Order placement failed: Invalid transaction type');
        return setBadRequest(reply, 'Transaction type must be BUY or SELL');
      }

      if (quantity <= 0) {
        logger.warn('Order placement failed: Invalid quantity');
        return setBadRequest(reply, 'Quantity must be greater than 0');
      }

      const result = await kiteOrderService.placeOrder({
        apiKey,
        tradingSymbol,
        quantity,
        transactionType,
        exchange,
        product,
        orderType
      });

      logger.info(`Order placed successfully: ${result.orderId}`);
      return setSuccess(reply, result);
    } catch (error: any) {
      logger.error(`Order placement error: ${error.message}`);
      return setBadRequest(reply, error.message);
    }
  });

  // Get order book
  fastify.get('/kite/orders', async (request, reply) => {
    try {
      const { apiKey } = request.query as OrderBookRequest;

      logger.info(`Order book request for apiKey: ${apiKey}`);

      if (!apiKey) {
        logger.warn('Order book request failed: Missing API key');
        return setBadRequest(reply, 'API key is required');
      }

      const result = await kiteOrderService.getOrderBook({ apiKey });

      logger.info(`Order book retrieved: ${result.orders.length} orders`);
      return setSuccess(reply, result);
    } catch (error: any) {
      logger.error(`Order book retrieval error: ${error.message}`);
      return setBadRequest(reply, error.message);
    }
  });

  // Get positions
  fastify.get('/kite/positions', async (request, reply) => {
    try {
      const { apiKey } = request.query as PositionsRequest;

      logger.info(`Positions request for apiKey: ${apiKey}`);

      if (!apiKey) {
        logger.warn('Positions request failed: Missing API key');
        return setBadRequest(reply, 'API key is required');
      }

      const result = await kiteOrderService.getPositions({ apiKey });

      logger.info(`Positions retrieved: ${result.net.length} net positions`);
      return setSuccess(reply, result);
    } catch (error: any) {
      logger.error(`Positions retrieval error: ${error.message}`);
      return setBadRequest(reply, error.message);
    }
  });
}
export interface PlaceOrderRequest {
  apiKey: string;
  tradingSymbol: string;
  quantity: number;
  transactionType: "BUY" | "SELL";
  exchange?: string;
  product?: string;
  orderType?: string;
}

export interface OrderResponse {
  orderId: string;
  status: string;
  message?: string;
}

export interface OrderBookRequest {
  apiKey: string;
}

export interface OrderBookResponse {
  orders: any[];
}

export interface PositionsRequest {
  apiKey: string;
}

export interface PositionsResponse {
  net: any[];
  day: any[];
}
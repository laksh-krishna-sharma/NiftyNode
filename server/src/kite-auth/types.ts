export interface KiteCredentials {
  apiKey: string;
  apiSecret: string;
}

export interface KiteLoginRequest {
  apiKey: string;
  apiSecret: string;
}

export interface KiteSessionRequest {
  sessionId: string;
  requestToken: string;
  apiKey: string;
  apiSecret: string;
}

export interface KiteLoginResponse {
  loginUrl: string;
  sessionId: string;
}

export interface KiteSessionResponse {
  accessToken: string;
  publicToken: string;
  loginTime: string;
  userId: string;
  email: string;
  userName: string;
  userShortName: string;
  broker: string;
  exchanges: string[];
  products: string[];
  orderTypes: string[];
  userType: string;
  apiKey: string;
  accessTokenExpiry: string;
}

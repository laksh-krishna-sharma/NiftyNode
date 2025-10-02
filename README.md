# trademcp-api

A Fastify-based API with user authentication and comprehensive logging.

## Features

- **User Authentication**: Register and login with JWT tokens
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis integration
- **Logging**: Winston-based logging with multiple levels and file output

## Installation

```bash
bun install
```

## Environment Setup

Copy the `.env` file and configure:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-secret-key"
LOG_LEVEL="info"  # debug, info, warn, error
```

## Database Setup

```bash
# Start database containers
docker compose up -d

# Run migrations
bunx prisma migrate dev --name init

# Generate Prisma client
bunx prisma generate
```

## Running the Application

```bash
bun run src/index.ts
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Kite Authentication Flow

1. **Generate Login URL**: Send API key and secret to `/kite/login` to get a login URL
2. **User Login**: Redirect user to the login URL, they authenticate with Kite
3. **Get Request Token**: After login, Kite redirects back with a request token in the URL
4. **Generate Access Token**: Send the request token, API key, and secret to `/kite/session`
5. **Store Token**: Access token is stored in Redis for 24 hours
6. **Use Token**: Retrieve stored token using `/kite/token/:apiKey` for subsequent API calls

#### Example Usage

```bash
# 1. Generate login URL
curl -X POST http://localhost:3000/kite/login \
  -H "Content-Type: application/json" \
  -d '{"apiKey":"your-api-key","apiSecret":"your-api-secret"}'

# Response: {"status":"Success","data":{"loginUrl":"https://kite.zerodha.com/connect/login?...","sessionId":"uuid"}}

# 2. After user logs in and gets redirected with request token, generate access token
# IMPORTANT: Use the sessionId from step 1, not "uuid"
curl -X POST http://localhost:3000/kite/session \
  -H "Content-Type: application/json" \
  -d '{"sessionId":"actual-session-id-from-step-1","requestToken":"request-token-from-url","apiKey":"your-api-key","apiSecret":"your-api-secret"}'

# 3. Get stored access token for API calls
# 3. Get stored access token for API calls
curl http://localhost:3000/kite/token/your-api-key

# 4. Place a BUY order
curl -X POST http://localhost:3000/kite/order/place \
  -H "Content-Type: application/json" \
  -d '{
    "apiKey": "your-api-key",
    "tradingSymbol": "RELIANCE",
    "quantity": 1,
    "transactionType": "BUY"
  }'

# 5. Place a SELL order
curl -X POST http://localhost:3000/kite/order/place \
  -H "Content-Type: application/json" \
  -d '{
    "apiKey": "your-api-key",
    "tradingSymbol": "RELIANCE",
    "quantity": 1,
    "transactionType": "SELL"
  }'

# 6. Get order book
curl "http://localhost:3000/kite/orders?apiKey=your-api-key"

# 7. Get positions
curl "http://localhost:3000/kite/positions?apiKey=your-api-key"

# 8. Get user profile
curl "http://localhost:3000/kite/profile?apiKey=your-api-key"
```

### Kite Authentication
- `POST /kite/login` - Generate Kite login URL
- `POST /kite/session` - Generate access token from request token
- `GET /kite/token/:apiKey` - Get stored access token
- `GET /kite/callback` - Handle Kite callback (extracts request token)
- `GET /trade/callback` - Alternative callback route

### Kite Trading Orders
- `POST /kite/order/place` - Place buy/sell orders
- `GET /kite/orders` - Get order book
- `GET /kite/positions` - Get current positions

### Kite User Profile
- `GET /kite/profile` - Get user profile information

## Logging

The application uses Winston for comprehensive logging:

- **Log Levels**: `error`, `warn`, `info`, `http`, `debug`
- **Console Output**: Colored, timestamped logs
- **File Output**:
  - `logs/all.log` - All log levels
  - `logs/error.log` - Error level only
- **Environment Control**: Set `LOG_LEVEL` in `.env`

### Log Examples

```
2025-09-24 20:23:50:2350 info: Registration request received for email: user@example.com
2025-09-24 20:23:51:2351 info: User registered successfully: user@example.com (ID: xxx)
2025-09-24 20:25:07:257 info: Login successful for email: user@example.com
```

## Development

This project was created using `bun init` in bun v1.2.21. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

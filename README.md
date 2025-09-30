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

### Health Check
- `GET /` - API health check

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

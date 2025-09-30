import winston from 'winston';
import appConfig from '../config';

// Create logs directory if it doesn't exist
import fs from 'fs';
import path from 'path';

const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logger = winston.createLogger({
  level: appConfig.LOG_LEVEL || 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

// Create a custom logger with formatted output
const customLogger = {
  info: (message: string) => {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} \x1b[32mINFO\x1b[0m: ${message}`);
  },
  error: (message: string) => {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} \x1b[31mERROR\x1b[0m: ${message}`);
  },
  warn: (message: string) => {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} \x1b[33mWARN\x1b[0m: ${message}`);
  },
  debug: (message: string) => {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} \x1b[35mDEBUG\x1b[0m: ${message}`);
  },
};

export default customLogger;

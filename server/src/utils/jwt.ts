import jwt from 'jsonwebtoken';
import appConfig from '../config';

const JWT_SECRET = appConfig.JWT_SECRET || 'are-teri-maa-ka-bhod-phat-jayega';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

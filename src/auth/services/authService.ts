import bcrypt from 'bcrypt';
import prisma from '../../utils/db';
import { generateToken } from '../../utils/jwt';
import logger from '../../utils/logger';
import type { RegisterData, LoginData } from '../types';

export const registerUser = async (data: RegisterData) => {
  const { fullName, email, password } = data;

  logger.info(`Attempting to register user with email: ${email}`);

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    logger.warn(`Registration failed: User already exists with email: ${email}`);
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      password: hashedPassword,
    },
  });

  const token = generateToken({ id: user.id, email: user.email });

  logger.info(`User registered successfully: ${email} (ID: ${user.id})`);

  return {
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
    },
    token,
  };
};

export const loginUser = async (data: LoginData) => {
  const { email, password } = data;

  logger.info(`Login attempt for email: ${email}`);

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    logger.warn(`Login failed: User not found with email: ${email}`);
    throw new Error('Invalid credentials');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    logger.warn(`Login failed: Invalid password for email: ${email}`);
    throw new Error('Invalid credentials');
  }

  const token = generateToken({ id: user.id, email: user.email });

  logger.info(`User logged in successfully: ${email} (ID: ${user.id})`);

  return {
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
    },
    token,
  };
};
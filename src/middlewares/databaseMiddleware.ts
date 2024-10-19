import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/data-source';

export const databaseMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!AppDataSource.isInitialized) {
    try {
      await AppDataSource.initialize();
      console.log('Database connection established');
    } catch (error) {
      console.error('Database connection error:', error);
      return res.status(500).json({ message: 'Database connection failed' });
    }
  }
  next();
};

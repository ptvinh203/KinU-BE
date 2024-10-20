import { Request, Response, NextFunction } from 'express';
import { Account } from '../models/Account';
import { AppDataSource } from '../config/data-source';
import { AuthService } from '@src/services/auth.service';
import { StatusCodes } from 'http-status-codes';

const login = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const result = await AuthService.login(req);
    res.status(StatusCodes.OK).json({
      status: "OK",
      data:result
    });
  } catch (error) {
    next(error);
  }
};

export const AuthController = {
    login
}
import { Request, Response, NextFunction } from 'express';
import { AccountService } from '@src/services/account.service';
import { StatusCodes } from 'http-status-codes';

const createAccount = async (req: Request, res: Response, next: NextFunction ) => {
  try {
    const result = await AccountService.createAccount(req);
    res.status(StatusCodes.CREATED).json({
      status: "CREATED",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const getAllAccounts = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const result = await AccountService.getAllAccounts(req);
    res.status(StatusCodes.CREATED).json({
      status: "OK",
      data: result
    });
  }catch(error){
    next(error);
  }
}

export const AccountController = {
  createAccount,
    getAllAccounts
}
import { Request, Response } from 'express';
import { Account } from '../models/Account';
import { AppDataSource } from '../config/data-source';
import { AccountService } from '@src/services/account.service';
import { StatusCodes } from 'http-status-codes';

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await AccountService.createUser(req);
    res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

export const AccountController = {
    createUser
}
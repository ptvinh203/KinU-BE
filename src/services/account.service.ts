import { Request, Response } from 'express';
import { Account } from '../models/Account';
import { AppDataSource } from '../config/data-source';

const createUser = async (req: Request) => {
  try {
    const { username, password, email, fullname, phone, birthday, gender } = req.body;
    const userRepo = AppDataSource.getRepository(Account);
    const newUser = userRepo.create({ username, password, email, fullname, phone, birthday, gender });
    await userRepo.save(newUser);
    return newUser;
  } catch (error) {
    throw error;
  }
};

export const AccountService = {
    createUser
}

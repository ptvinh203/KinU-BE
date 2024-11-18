import { EWalletService } from "@src/services/ewallet.service";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const linkEWallet = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const ewallet = await EWalletService.linkEWallet(req);
        res.status(StatusCodes.CREATED).json({
            status: "CREATED",
            data: ewallet
        });
    }catch(error){
        next(error);
    }
};

const unlinkEWallet = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const result = await EWalletService.unlinkEWallet(req);
        res.status(StatusCodes.CREATED).json({
            status: "CREATED",
            data: result
        });
    }catch(error){
        next(error);
    }
};

const payment = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const result = await EWalletService.payment(req);
        res.status(StatusCodes.CREATED).json({
            status: "CREATED",
            data: result
        });
    }catch(error){
        next(error);
    }
}

export const EWalletController = {
    linkEWallet,
    unlinkEWallet,
    payment
}
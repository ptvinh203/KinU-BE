import { NotificationService } from '@src/services/notification.service';
import { TypeSprinding } from './../models/TypeSprinding';
import { AppDataSource } from "@src/config/data-source";
import BadRequestError from "@src/errors/BadRequestError";
import NotFoundError from "@src/errors/NotFoundError";
import { Account } from "@src/models/Account";
import { EWallet } from "@src/models/EWallet";
import { Expenditure } from "@src/models/Expenditure";
import addSevenHours from '@src/utils/addSevenHours';
import {Request} from "express";

const userRepository = AppDataSource.getRepository(Account);
const ewalletRepository = AppDataSource.getRepository(EWallet);
const expenditureRepository = AppDataSource.getRepository(Expenditure);
const typeSprindingRepository = AppDataSource.getRepository(TypeSprinding)



const linkEWallet = async (req: Request) => {
    try{
        const {userId, phone, pinCode, balance} = req.body;
        if(!userId || !phone || !pinCode || !balance){
            throw new BadRequestError("Tham số req không hợp lệ!");
        }

        const user = await userRepository.findOne({where: {id: Number(userId)}});
        if(!user){
            throw new NotFoundError("Không tìm thấy thông tin người dùng!");
        }

        const linkedEwallet = await ewalletRepository.findOne({where: {phone}});
        if(linkedEwallet){
            throw new BadRequestError("Số điện thoại đã được liên kết với ví điện tử");
        }

        const existingUserWallet = await ewalletRepository.findOne({ where: { user } });
        if (existingUserWallet) {
          throw new BadRequestError("Người dùng này đã có ví điện tử liên kết!");
        }

        const ewallet = ewalletRepository.create({
            user,
            phone: phone,
            pinCode,
            balance
        });
        const savedEWallet = await ewalletRepository.save(ewallet);
        return savedEWallet;
    }catch(error){
        throw error;
    }
}

const unlinkEWallet = async (req: Request) => {
    try{
        const ewalletId = req.params.ewalletId;
        if(!ewalletId){
            throw new BadRequestError("Tham số ewalletId không hợp lệ!");
        }

        const ewallet = await ewalletRepository.findOne({where: {id: Number(ewalletId)}});
        if(!ewallet){
            throw new NotFoundError("Không tìm thấy ví!");
        }

        await ewalletRepository.remove(ewallet);

        return { message: 'Hủy liên kết ví thành công!' };
    }catch(error){
        throw error;
    }
}

const payment = async (req: Request) => {
    try{
        const {price, msg, type, user_email} = req.body;
        if(!price || !msg || !type || !user_email){
            throw new BadRequestError("Tham số từ req không hợp lệ!");
        }

        const user = await userRepository.findOne({where: {email: user_email}, relations: ["wallets"]});
        if(!user){
            throw new NotFoundError("Không tìm thấy người dùng!");
        }
        if(user.wallets.length <= 0){
            throw new BadRequestError("Tài khoản chưa liên kết ví!");
        }

        let typeSprinding = await typeSprindingRepository.findOne({where: {abbreviation: type, user}});
        if(!typeSprinding){
            typeSprinding = await typeSprindingRepository.findOne({where: {abbreviation: "", user}});
        }

        const newExpenditure: Expenditure = expenditureRepository.create({
            name: msg,
            typeSprinding: typeSprinding || undefined,
            amount: +price,
            dateSpinding: addSevenHours(new Date()),
            user,
            paymentType: true
          })
        
        const savedExpenditure = await expenditureRepository.save(newExpenditure);

        await NotificationService.createNotification(savedExpenditure);

        return savedExpenditure;
    }catch(error){
        throw error;
    }
}

export const EWalletService = {
    linkEWallet,
    unlinkEWallet,
    payment
}
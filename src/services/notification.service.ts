import { AppDataSource } from "@src/config/data-source"
import BadRequestError from "@src/errors/BadRequestError"
import NotFoundError from "@src/errors/NotFoundError"
import { Expenditure } from "@src/models/Expenditure"
import { Notification } from "@src/models/Notification"
import addSevenHours from "@src/utils/addSevenHours"
import { Request } from "express"
import typeSprindingSpentAmount from '../utils/typeSprindingSpentAmount'
import { Account } from "@src/models/Account"

const notificationRepository = AppDataSource.getRepository(Notification)
const userRepository = AppDataSource.getRepository(Account)

const getNotificationByUserId = async (req: Request) => {
    try {
        const { userId } = req.query;

        const parsedUserId = Number(userId);
        if (!parsedUserId) {
            throw new BadRequestError("Tham số userId không hợp lệ!");
        }

        const notifications = await notificationRepository.find({
            where: { user: { id: parsedUserId }, read: false },
            order: { id: 'DESC' }});

        return notifications;
    } catch (error) {
        throw error;
    }
}

const createNotification = async (expenditure: Expenditure) => {
    try {
        const notificationContent = `Thành công - ${expenditure.amount.toLocaleString()} VND ${expenditure.name}, khoản chi ${expenditure.typeSprinding.name}.`

        const {typeSprinding} = expenditure
        if(!typeSprinding){
            throw new NotFoundError("Không tìm thấy loại chi tiêu trong chi tiêu!")
        }
        const spentAmount = await typeSprindingSpentAmount(typeSprinding.id)

        const newNotification = notificationRepository.create({
            content: notificationContent,
            typeNotifiction: spentAmount >= typeSprinding.estimatedAmount ? 'OverSpending' : 'Expenditure',
            user: expenditure.user,
            createdAt: addSevenHours(new Date()),
            read: false
        });

        await notificationRepository.save(newNotification);
    } catch (error) {
        throw error;
    }
};

const setReadNotification = async (req: Request) => {
    try{
        const {id} = req.params
        const notiId = Number(id)
        if(!notiId){
            throw new BadRequestError("Tham số id truyền vào không hợp lệ!")
        }
        const noti = await notificationRepository.findOne({where: {id: notiId}})
        if(!noti){
            throw new NotFoundError("Không tìm thấy thông báo!")
        }
        noti.read = true
        const readNoti = await notificationRepository.save(noti)
        return readNoti
    }catch(error){
        throw error
    }
}

const setReadAllNotification = async (req: Request)=>{
    try{
        const {userId} = req.query
        const userIdnum = Number(userId)
        if(!userIdnum){
            throw new BadRequestError("Tham số id truyền vào không hợp lệ!")
        }
        const notifications = await notificationRepository.find({
            where: { user: { id: userIdnum }, read: false }
        });

        console.log(notifications)

        if (notifications.length === 0) {
            return []
        }

        for (const notification of notifications) {
            notification.read = true;
        }

        const readNotifications = await notificationRepository.save(notifications);
        return readNotifications;
    }catch(error){
        throw error
    }
}


export const NotificationService = {
    getNotificationByUserId,
    createNotification,
    setReadNotification,
    setReadAllNotification
}
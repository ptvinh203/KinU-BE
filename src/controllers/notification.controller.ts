import { NotificationService } from "@src/services/notification.service"
import { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"


const getReadNotification = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const result = await NotificationService.getReadNotification(req)
        return res.status(StatusCodes.OK).json({
            status: "OK",
            data: result 
        })
    }catch(error){
        next(error)
    }
}

const getUnReadNotification = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const result = await NotificationService.getUnReadNotification(req)
        return res.status(StatusCodes.OK).json({
            status: "OK",
            data: result 
        })
    }catch(error){
        next(error)
    }
}

const getNotificationByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const result = await NotificationService.getNotificationByUserId(req)
        return res.status(StatusCodes.OK).json({
            status: "OK",
            data: result 
        })
    }catch(error){
        next(error)
    }
}

const setReadNotification = async (req: Request, res: Response, next: NextFunction)=>{
    try{
        const result = await NotificationService.setReadNotification(req)
        return res.status(StatusCodes.OK).json({
            status: "OK",
            data: result 
        })
    }catch(error){
        next(error)
    }
}

const setReadAllNotification = async (req: Request, res: Response, next: NextFunction)=>{
    try{
        const result = await NotificationService.setReadAllNotification(req)
        return res.status(StatusCodes.OK).json({
            status: "OK",
            data: result 
        })
    }catch(error){
        next(error)
    }
}


export const NotificationController = {
    getNotificationByUserId,
    setReadNotification,
    setReadAllNotification,
    getUnReadNotification,
    getReadNotification
}
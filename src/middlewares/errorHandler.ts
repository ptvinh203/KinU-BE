import {StatusCodes} from "http-status-codes";
import { NextFunction, Request, Response } from 'express';
import CustomAPIError from "@src/errors/CustomAPIError";

const ErrorHanlder = (err:CustomAPIError, req:Request, res: Response, next: NextFunction)=>{
    if(!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    
    console.log(err);

    const responseError = {
        status: "error",
        statusCode: err.statusCode,
        message: err.message || StatusCodes[err.statusCode],
    }

    //  console.error(responseError)

    // Chỉ khi môi trường là DEV thì mới trả về Stack Trace để debug dễ dàng hơn, còn không thì xóa đi. (Muốn hiểu rõ hơn hãy xem video 55 trong bộ MERN Stack trên kênh Youtube: https://www.youtube.com/@trungquandev)
    // if (env.BUILD_MODE !== 'dev') delete responseError.stack
    
    // console.error(responseError)

    res.status(responseError.statusCode).json(responseError);
};

export default ErrorHanlder;
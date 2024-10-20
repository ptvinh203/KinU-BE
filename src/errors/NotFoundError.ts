import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./CustomAPIError";

class NotFoundError extends CustomAPIError{
    constructor(message:string){
        super(StatusCodes.NOT_FOUND, message);
        
        Error.captureStackTrace(this, this.constructor);
        
        this.name = this.constructor.name;
    }
}

export default NotFoundError;
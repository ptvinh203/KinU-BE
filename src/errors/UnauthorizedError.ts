import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./CustomAPIError";
class UnauthorizedError extends CustomAPIError{
    constructor(message:string){
        super(StatusCodes.UNAUTHORIZED, message);
        
        Error.captureStackTrace(this, this.constructor);
        
        this.name = this.constructor.name;
    }
}

export default UnauthorizedError;
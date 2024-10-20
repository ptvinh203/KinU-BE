import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./CustomAPIError";

class ForbiddenError extends CustomAPIError{
    constructor(message: string){
        super(StatusCodes.FORBIDDEN, message);
        
        Error.captureStackTrace(this, this.constructor);
        
        this.name = this.constructor.name;
    }
}

export default ForbiddenError;
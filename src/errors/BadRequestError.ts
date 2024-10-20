import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./CustomAPIError";

class BadRequestError extends CustomAPIError {
    constructor(message:string = 'Bad Request') {
      super(StatusCodes.BAD_REQUEST, message); 
    }
  }
  
  export default BadRequestError;
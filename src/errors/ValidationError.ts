import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./CustomAPIError";

class ValidationError extends CustomAPIError {
    constructor(message:string = 'Validation Error') {
      super(StatusCodes.UNPROCESSABLE_ENTITY, message); 

    }
  }
  
  export default ValidationError;
import CustomError from "./custom-error";
import { StatusCodes } from "http-status-codes";

class UnauthenticatedError extends CustomError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;

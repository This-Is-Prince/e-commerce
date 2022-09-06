import CustomError from "./custom-error";
import { StatusCodes } from "http-status-codes";

class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

export default UnauthorizedError;

import { StatusCodes } from "http-status-codes";

class CustomError extends Error {
  public statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.OK;
  }
}

export default CustomError;

import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

const notFoundMiddleware: RequestHandler = async (req, res) => {
  res.status(StatusCodes.NOT_FOUND).send(`<h1>Route Does not exist</h1>`);
};

export default notFoundMiddleware;

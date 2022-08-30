import { RequestHandler } from "express";
import User from "../models/User.model";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors";
import { attachCookiesToResponse } from "../utils";

const register: RequestHandler = async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError("Email already exists");
  }

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ email, name, password, role });

  const tokenUser = { userId: user._id, name: user.name, role: user.role };
  attachCookiesToResponse({ res, payload: tokenUser });
  
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login: RequestHandler = async (req, res) => {
  res.send("login user");
};

const logout: RequestHandler = async (req, res) => {
  res.send("logout user");
};

export { register, login, logout };

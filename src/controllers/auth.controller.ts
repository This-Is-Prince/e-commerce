import type { RequestHandler } from "express";
import User from "../models/User.model";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors";
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
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Please provide valid email");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Please provide valid password");
  }

  const { _id, name, role } = user;
  const tokenUser = { userId: _id, name, role };
  attachCookiesToResponse({ res, payload: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const logout: RequestHandler = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

export { register, login, logout };

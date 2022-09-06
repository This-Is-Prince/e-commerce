import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors";
import User, { Role } from "../models/User.model";

const getAllUsers: RequestHandler = async (req, res) => {
  console.log(req.user);
  const users = await User.find({ role: Role.User }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser: RequestHandler = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findOne({ _id: userId }).select("-password");
  if (!user) {
    throw new NotFoundError(`No user with id : ${userId}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser: RequestHandler = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser: RequestHandler = async (req, res) => {
  res.send("update user");
};

const updateUserPassword: RequestHandler = async (req, res) => {
  res.send("update user password");
};

export {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};

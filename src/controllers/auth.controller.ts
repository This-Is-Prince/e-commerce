import { RequestHandler } from "express";

const register: RequestHandler = async (req, res) => {
  res.send("register user");
};

const login: RequestHandler = async (req, res) => {
  res.send("login user");
};

const logout: RequestHandler = async (req, res) => {
  res.send("logout user");
};

export { register, login, logout };

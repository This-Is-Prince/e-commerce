"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const utils_1 = require("../utils");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, password } = req.body;
    const emailAlreadyExists = yield User_model_1.default.findOne({ email });
    if (emailAlreadyExists) {
        throw new errors_1.BadRequestError("Email already exists");
    }
    // first registered user is an admin
    const isFirstAccount = (yield User_model_1.default.countDocuments({})) === 0;
    const role = isFirstAccount ? "admin" : "user";
    const user = yield User_model_1.default.create({ email, name, password, role });
    const tokenUser = { userId: user._id, name: user.name, role: user.role };
    (0, utils_1.attachCookiesToResponse)({ res, payload: tokenUser });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ user: tokenUser });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new errors_1.BadRequestError("Please provide email and password");
    }
    const user = yield User_model_1.default.findOne({ email });
    if (!user) {
        throw new errors_1.UnauthenticatedError("Please provide valid email");
    }
    const isPasswordCorrect = yield user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new errors_1.UnauthenticatedError("Please provide valid password");
    }
    const { _id, name, role } = user;
    const tokenUser = { userId: _id, name, role };
    (0, utils_1.attachCookiesToResponse)({ res, payload: tokenUser });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ user: tokenUser });
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "user logged out!" });
});
exports.logout = logout;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserPassword = exports.updateUser = exports.showCurrentUser = exports.getSingleUser = exports.getAllUsers = void 0;
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const User_model_1 = __importStar(require("../models/User.model"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.user);
    const users = yield User_model_1.default.find({ role: User_model_1.Role.User }).select("-password");
    res.status(http_status_codes_1.StatusCodes.OK).json({ users });
});
exports.getAllUsers = getAllUsers;
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const user = yield User_model_1.default.findOne({ _id: userId }).select("-password");
    if (!user) {
        throw new errors_1.NotFoundError(`No user with id : ${userId}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ user });
});
exports.getSingleUser = getSingleUser;
const showCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(http_status_codes_1.StatusCodes.OK).json({ user: req.user });
});
exports.showCurrentUser = showCurrentUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("update user");
});
exports.updateUser = updateUser;
const updateUserPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("update user password");
});
exports.updateUserPassword = updateUserPassword;

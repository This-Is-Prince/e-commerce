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
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let customError = {
        // set default
        statusCode: err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong try again later",
    };
    if (err.name === "ValidationError") {
        customError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(",");
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
    if (err.name === "CastError") {
        customError.msg = `No item found with id : ${err.value}`;
        customError.statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
    }
    return res.status(customError.statusCode).json({ msg: customError.msg });
});
exports.default = errorHandlerMiddleware;

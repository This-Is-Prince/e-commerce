"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachCookiesToResponse = exports.isTokenValid = exports.createJWT = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const createJWT = ({ payload }) => {
    const token = (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
    return token;
};
exports.createJWT = createJWT;
const isTokenValid = ({ token }) => {
    return (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
};
exports.isTokenValid = isTokenValid;
const attachCookiesToResponse = ({ res, payload }) => {
    const token = createJWT({ payload });
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production",
        signed: true,
    });
};
exports.attachCookiesToResponse = attachCookiesToResponse;

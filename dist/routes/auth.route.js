"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const authRouter = (0, express_1.Router)();
authRouter.route("/register").post(auth_controller_1.register);
authRouter.route("/login").post(auth_controller_1.login);
authRouter.route("/logout").get(auth_controller_1.logout);
exports.default = authRouter;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const authentication_1 = require("../middleware/authentication");
const User_model_1 = require("../models/User.model");
const userRouter = (0, express_1.Router)();
userRouter
    .route("/")
    .get(authentication_1.authenticateUser, (0, authentication_1.authorizePermissions)(User_model_1.Role.Admin), user_controller_1.getAllUsers);
userRouter.route("/showMe").get(authentication_1.authenticateUser, user_controller_1.showCurrentUser);
userRouter.route("/updateUser").post(user_controller_1.updateUser);
userRouter.route("/updateUserPassword").post(user_controller_1.updateUserPassword);
userRouter.route("/:userId").get(authentication_1.authenticateUser, user_controller_1.getSingleUser);
exports.default = userRouter;

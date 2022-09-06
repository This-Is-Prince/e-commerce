import { Router } from "express";
import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} from "../controllers/user.controller";
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authentication";
import { Role } from "../models/User.model";

const userRouter = Router();

userRouter
  .route("/")
  .get(
    authenticateUser,
    authorizePermissions(Role.Admin),
    getAllUsers
  );
userRouter.route("/showMe").get(authenticateUser, showCurrentUser);
userRouter.route("/updateUser").post(updateUser);
userRouter.route("/updateUserPassword").post(updateUserPassword);
userRouter.route("/:userId").get(authenticateUser, getSingleUser);

export default userRouter;

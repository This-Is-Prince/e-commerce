import { model, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import type { IUserDocument } from "../types/models/User.model";

export enum Role {
  Admin = "admin",
  User = "user",
}

const UserSchema = new Schema<IUserDocument>({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: Role,
    default: Role.User,
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

const User = model<IUserDocument>("User", UserSchema);

export default User;

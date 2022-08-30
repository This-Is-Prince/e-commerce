import { model, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

interface IUser {
  name: string;
  email: string;
  password: string;
  role: Role;
}

enum Role {
  Admin = "admin",
  User = "user",
}

interface IUserDocument extends IUser, Document {
  comparePassword: (password: string) => boolean;
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
  return await bcrypt.compare(password, this.password);
};

const User = model<IUserDocument>("User", UserSchema);

export default User;

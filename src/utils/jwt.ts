import { sign, verify } from "jsonwebtoken";
import { Role } from "../models/User.model";
import type {
  AttachCookiesToResponse,
  CreateJWT,
  IsTokenValid,
} from "../types/controllers/auth.controller";

interface JwtPayload {
  userId: string;
  name: string;
  role: Role
}
const createJWT: CreateJWT = ({ payload }) => {
  const token = sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_LIFETIME as string,
  });

  return token;
};

const isTokenValid: IsTokenValid = ({ token }) => {
  return verify(token, process.env.JWT_SECRET as string)as JwtPayload
};

const attachCookiesToResponse: AttachCookiesToResponse = ({ res, payload }) => {
  const token = createJWT({ payload });
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

export { createJWT, isTokenValid, attachCookiesToResponse };

import { RequestHandler } from "express";
import { UnauthenticatedError, UnauthorizedError } from "../errors";
import { Role } from "../models/User.model";
import { isTokenValid } from "../utils";

declare global {
  namespace Express {
    export interface Request {
      user?: { userId: string; name: string; role: Role };
    }
  }
}

const authenticateUser: RequestHandler = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new UnauthenticatedError(`Authentication Invalid`);
  }
  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, role, userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError(`Authentication Invalid`);
  }
};

type TAuthorizedPermissions = (...roles: Role[]) => RequestHandler;

const authorizePermissions: TAuthorizedPermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role as Role)) {
      throw new UnauthorizedError(`Unauthorized to access this route`);
    }
    next();
  };
};

export { authenticateUser, authorizePermissions };

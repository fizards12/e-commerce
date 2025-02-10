import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';
import { IUser, RequestWithUser } from '../interfaces/user';
import { IRole } from '../interfaces/role';
import { isObjectIdOrHexString, Types } from 'mongoose';
import { Errors } from '../enum/errors';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../env';
import { clearTokenFromCookie } from '../services/jwt';
import { ErrorGenerator } from '../services/error';

export const checkRole = (roles: string[]) => {
  return async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      if(!req.body.role || !isObjectIdOrHexString(req.body.role)){
        throw new ErrorGenerator(Errors.INVALID_ID, "Role");
      }
      const user = await User.findById(req.body.id).populate<{ role: IRole }>('role') || {} as IUser<IRole>;
      if (!user) {
        throw new ErrorGenerator(Errors.NOT_FOUND, "User");
      }

      if (user.role && !roles.includes(user.role.name.toLowerCase())) {
        throw new ErrorGenerator(Errors.FORBIDDEN, "User");
      }

      next();
    } catch (error) {
      if(error instanceof ErrorGenerator){
        let message = error.type == Errors.INVALID_ID ? "Invalid user role" : error.message;
        res.status(error.status).send({ error_type: error.type, message: message });
        return;
      }
      next(error);
    }
  };
};
export const validateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.cookies.token;

  if (!token) {
    throw new ErrorGenerator(Errors.INVALID_TOKEN, "User");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as IUser<string>;
    const user = await User.findById(decoded.id)
    if(!user || user.email !== decoded.email || !isObjectIdOrHexString(decoded.role) || user.role != new Types.ObjectId(decoded.role)){
      throw new ErrorGenerator(Errors.INVALID_TOKEN, "User");
    }
    next();
  } catch (error) {
    if(error instanceof ErrorGenerator){
      clearTokenFromCookie(res);
      res.status(error.status).send({ error_type: error.type,message: error.message });
      return
    }
    next(error)
  }
};
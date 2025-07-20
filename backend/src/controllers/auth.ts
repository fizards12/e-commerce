import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';
import bcrypt from 'bcrypt';
import { FRONTEND_URL, SALTS_ROUNDS } from '../env';
import { IUser, RequestWithUser, UserWithRole, UserwithRoleId } from '../interfaces/user';
import { Errors } from '../enum/errors';
import { isObjectIdOrHexString, Types } from 'mongoose';
import { generateToken, storeTokenInCookie, clearTokenFromCookie, generateResetToken, verifyToken } from '../services/jwt';
import { ErrorGenerator } from '../services/error';
import { hashString } from '../utils/string';
import Mailer from '../services/nodemailer';
import { JwtPayload } from 'jsonwebtoken';
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password, address, phone, role } = req.body;
    let roleObjectId: Types.ObjectId;
    if(!role || !isObjectIdOrHexString(role)) {
       throw new ErrorGenerator(Errors.INVALID_CREDENTIALS, "User");
    }
    roleObjectId = new Types.ObjectId(role);
    const hashedPassword = bcrypt.hashSync(password, SALTS_ROUNDS);
    const user = new User({ name, email, password: hashedPassword, address, phone, role: roleObjectId });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error : any) {
    if (error.code === 11000) {
      let err = new ErrorGenerator(Errors.DUPLICATE_KEYS, "User",error);
      res.status(err.status).send({ error_type: err.type, message: 'This email is already registered' });
      return;
    }
    if(error instanceof ErrorGenerator){
      res.status(error.status).send({ error_type: error.type, message: error.message });
      return;
    }
    let err = new ErrorGenerator(Errors.ERROR_CREATING, "User",error);
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email }) as UserwithRoleId;
    if (!user) {
      throw new ErrorGenerator(Errors.NOT_FOUND, "User");
    }
    const isMatch = await bcrypt.compare(password, user.password as string);
    if (!isMatch) {
      throw new ErrorGenerator(Errors.INVALID_CREDENTIALS, "User");
    }
    const token = generateToken({ id: user.id, email: user.email,role: user.role?.toHexString() || "" });
    storeTokenInCookie(token,res);
    res.status(200).send({ id: user.id });
  } catch (error) {
    if(error instanceof ErrorGenerator){
      res.status(error.status).send({ error_type: error.type, message: error.message });
      return;
    }
    let err = new ErrorGenerator(Errors.INVALID_CREDENTIALS, "User",error);
    next(err);
  }
};

export const getProfile = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.body.id || !isObjectIdOrHexString(req.body.id)) {
      throw new ErrorGenerator(Errors.INVALID_ID, "User");
    }
    const user = await User.findById(req.body.id).populate('role');
    if (!user) {
      throw new ErrorGenerator(Errors.NOT_FOUND, "User");
    }
    res.status(200).json({user: user.toJSON()});
  } catch (error) {
    if(error instanceof ErrorGenerator){
      res.status(error.status).send({ error_type: error.type, message: error.message });
    }
    let err = new ErrorGenerator(Errors.ERROR_FETCHING_DETAILS, "User",error);
    next(err);
  }
};

export const logout = (req: Request, res: Response): void => {
  clearTokenFromCookie(res);
  res.sendStatus(200);
};



export const getLoggedInUser = async (req: Request & {user?: IUser<Types.ObjectId | string>}, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Regenerate user token
    // const user = req.user;
    // if(user){
    //   const token = generateToken({ id: user.id, email: user.email,role: user.role || "" });
    //   storeTokenInCookie(token,res);
    // }
    res.status(200).send({ message: "Success" });
    return
  } catch (error) {
    if(error instanceof ErrorGenerator){
      res.status(error.status).send({ error_type: error.type, message: error.message });
      return
    }
    let err = new ErrorGenerator(Errors.ERROR_FETCHING_DETAILS, "User",error);
    next(err);
  }
};

export const forgetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new ErrorGenerator(Errors.NOT_FOUND, "User");
    }
    const hashKey = hashString(email);
    const token = generateResetToken(hashKey,email);
    await Mailer.getInstance().sendMail({
      to: email,
      subject: "Reset Password",
      html: `
        <div>
          <h1>Hello ${user.name}</h1>
          <h2>Reset Password</h2>
          <p>You have requested to reset your password.</p>
          <p>Click <a href="http://${FRONTEND_URL}/auth/reset-password/${token}">here</a> to reset your password.</p>
        </div>
      `
    })
    res.status(200).send({ message: "Success" });
  } catch (error) {
    if(error instanceof ErrorGenerator){
      res.status(error.status).send({ error_type: error.type, message: error.message });
      return
    }
    let err = new ErrorGenerator(Errors.INVALID_USER_EMAIL, "User",error);
    next(err);
  }  
}

export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { token, password } = req.body;
    const payload = verifyToken(token) as JwtPayload;
    if(!payload) {
      throw new ErrorGenerator(Errors.INVALID_TOKEN, "User");
    }
    const { email, key } = payload;
    if(key !== hashString(email)){
      throw new ErrorGenerator(Errors.INVALID_TOKEN, "User");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new ErrorGenerator(Errors.NOT_FOUND, "User");
    }
    const hashedPassword = bcrypt.hashSync(password, SALTS_ROUNDS);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({ message: "Success" });
  } catch (error) {
    if(error instanceof ErrorGenerator){
      res.status(error.status).send({ error_type: error.type, message: error.message });
      return
    }
    console.log(error);
    let err = new ErrorGenerator(Errors.ERROR_CREATING, "User",error);
    next(err);
  }
}
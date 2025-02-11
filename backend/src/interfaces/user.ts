import { Document, Types } from "mongoose";
import { IRole } from "./role";
import { Request } from "express";

export interface IUser<T> extends Document {
  id: string;
  __v?: number
  name: string;
  email: string;
  password?: string;
  address?: string;
  phone?: string;
  role?: T;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserWithRole = IUser<IRole>;
export type UserwithRoleId = IUser<Types.ObjectId>;

// Extend the Request interface
export interface RequestWithUser extends Request {
  body: UserwithRoleId
}

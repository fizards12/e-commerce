import { IRole } from "./role";

export interface IUser {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    address?: string;
    phone?: string;
    role?: IRole | string;
  }
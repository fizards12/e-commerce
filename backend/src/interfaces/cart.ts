import { Types } from "mongoose";
import { IProduct } from "./product";
import { IUser } from "./user";

export interface CartItemInterface<T = string | Types.ObjectId | IProduct<Types.ObjectId>> {
    id?: string;
    __v?: number;
    product: T;
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CartInterface<T = IUser<Types.ObjectId>> {
    id?: string;
    __v?: number;
    user: T;
    items: (CartItemInterface | Types.ObjectId | string)[];
    total_amount: number;
    createdAt: Date;
    updatedAt: Date;
}
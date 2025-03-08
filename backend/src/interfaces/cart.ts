import { Types } from "mongoose";
import { IProduct } from "./product";
import { IUser } from "./user";

export interface CartItemInterface<T = string | Types.ObjectId | IProduct<Types.ObjectId>> {
    id?: string;
    __v?: number;
    product: T;
    cart?: Types.ObjectId | string;
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CartInterface<T = IUser<Types.ObjectId>> {
    id?: string;
    __v?: number;
    items?: CartItemInterface<T>[];
    user: T;
    total_amount: number;
    createdAt: Date;
    updatedAt: Date;
}
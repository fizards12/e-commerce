import { Types } from 'mongoose';
import { ICategory } from './category';
import { Request } from 'express';

export interface IProduct<T = Types.ObjectId> {
    id?: string;
    __v?: number;
    name?: string;
    user: Types.ObjectId | string; 
    img?: string;
    description?: string;
    price?: number;
    stock?: number;
    category: T;
    createdAt?: Date;
    updatedAt?: Date;
}

export type ProductWithCategory = IProduct<ICategory>;
export type ProductWithCategoryId = IProduct<Types.ObjectId>;

// Extend the Request interface
export interface RequestWithProduct extends Request {
    body: {
        product: IProduct<ICategory | Types.ObjectId>;
    }
}


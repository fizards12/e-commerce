import { Document } from 'mongoose';

export interface ICategory extends Document {
    id?: string;
    __v?: number;
    name: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}



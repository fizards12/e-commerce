import { Document, Schema } from "mongoose";

export interface IRole extends Document {
    id?: string;
    __v?: number;
    name: string;
    description?: string;
    pages: string[];
    createdAt?: Date;
    updatedAt?: Date;
}
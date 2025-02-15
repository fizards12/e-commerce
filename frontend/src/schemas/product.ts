import { ICategory } from "./category";

export interface IProduct<T= string | ICategory> {
    id?: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: T;
    createdAt?: Date;
    updatedAt?: Date;
  }
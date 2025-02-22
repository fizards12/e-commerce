import { ICategory } from "./category";

export interface IProduct<T= string | ICategory> {
    id?: string;
    name: string;
    description: string;
    price: number;
    img?: File | string;
    stock: number;
    category: T;
    createdAt?: Date;
    updatedAt?: Date;
  }
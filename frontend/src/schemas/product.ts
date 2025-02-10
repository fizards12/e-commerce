export interface IProduct {
    id?: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string | object;
    createdAt?: Date;
    updatedAt?: Date;
  }
import axios from "axios"
import { IProduct } from "../schemas/product"
import { ICategory } from "../schemas/category"
const SERVER_URL = import.meta.env.VITE_SERVER_URL

export const getProducts = async () => {
    const response = await axios.get<{ products: IProduct[] }>(`${SERVER_URL}/products`);
    return response.data;
}

export const getProduct = async (id: string) => {
    const response = await axios.get<{ product: IProduct }>(`${SERVER_URL}/products/${id}`);
    return response.data;
}

export const createProduct = async (product: IProduct) => {
    const response = await axios.post<{ product: IProduct }>(`${SERVER_URL}/products`, { product });
    return response.data;
}

export const updateProduct = async (id: string, product: IProduct) => {
    const response = await axios.put<{ product: IProduct }>(`${SERVER_URL}/products/${id}`, { product });
    return response.data;
}

export const deleteProduct = async (id: string) => {
    const response = await axios.delete(`${SERVER_URL}/products/${id}`);
    return response.data;
}

export const getCategories = async () => {
    const response = await axios.get<{ categories: ICategory[] }>(`${SERVER_URL}/categories`);
    return response.data;
}

export const createCategory = async (category: ICategory) => {
    const response = await axios.post<{ category: ICategory }>(`${SERVER_URL}/categories`, { category });
    return response.data;
}

export const updateCategory = async (id: string, category: ICategory) => {
    const response = await axios.put<{ category: ICategory }>(`${SERVER_URL}/categories/${id}`, { category });
    return response.data;
}

export const deleteCategory = async (id: string) => {
    const response = await axios.delete(`${SERVER_URL}/categories/${id}`);
    return response.data;
}

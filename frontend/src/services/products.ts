import { IProduct } from "../schemas/product"
import { ICategory } from "../schemas/category"
import axios from "./call"

export const getList = async () => {
    const response = await axios.get<{ products: IProduct<string>[] }>(`products/view`);
    return response.data;
}
export const getDoc = async (id: string) => {
    const response = await axios.get<{ product: IProduct<string> }>(`products/view/${id}`);
    return response.data;
}

export const getProducts = async () => {
    const response = await axios.get<{ products: IProduct<string>[] }>(`products`);
    return response.data;
}

export const getProduct = async (id: string) => {
    const response = await axios.get<{ product: IProduct<string> }>(`products/${id}`);
    return response.data;
}

export const createProduct = async (product: IProduct<string>) => {
    const formData = new FormData();
    let img : File | string | undefined;
    if(product.img && product.img instanceof File){
        img = product.img;
        delete product.img;
    }
    formData.append('product', JSON.stringify(product));
    formData.append('img', img as Blob);
    const response = await axios.post<FormData>(`products`, formData,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

export const updateProduct = async (id: string, product: IProduct<string>) => {
    const formData = new FormData();
    let img : File | string | undefined;
    if(product.img){
        img = product.img;
        delete product.img;
    }
    formData.append('product', JSON.stringify(product));
    formData.append('img', img as Blob);
    const response = await axios.put<FormData>(`products/${id}`, formData,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

export const deleteProduct = async (id: string) => {
    const response = await axios.delete(`products/${id}`);
    return response.data;
}

export const getCategories = async () => {
    const response = await axios.get<{ categories: ICategory[] }>(`categories`);
    return response.data;
}

export const getCategory = async (id: string) => {
    const response = await axios.get<{ categories: ICategory[] }>(`categories/${id}`);
    return response.data;
}

export const createCategory = async (category: ICategory) => {
    const response = await axios.post<{ category: ICategory }>(`categories`, { category });
    return response.data;
}

export const updateCategory = async (id: string, category: ICategory) => {
    const response = await axios.put<{ category: ICategory }>(`categories/${id}`, { category });
    return response.data;
}

export const deleteCategory = async (id: string) => {
    const response = await axios.delete(`categories/${id}`);
    return response.data;
}

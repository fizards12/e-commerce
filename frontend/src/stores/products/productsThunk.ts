import { createAsyncThunk } from '@reduxjs/toolkit';
import { call } from '../../services/call';
import { getProducts, getProduct, getCategories, createCategory, updateCategory, deleteCategory, createProduct, updateProduct, deleteProduct } from '../../services/products';
import { ICategory } from '../../schemas/category';
import { IProduct } from '../../schemas/product';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    return await call(getProducts, []);
  }
);

export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (id: string) => {
    return await call(getProduct, [id]);
  }
);

export const createProductThunk = createAsyncThunk(
  'products/createProduct',
  async (product: IProduct) => {
    return await call(createProduct, [product]);
  }
);

export const updateProductThunk = createAsyncThunk(
  'products/updateProduct',
  async ({ id, product }: { id: string, product: IProduct }) => {
    return await call(updateProduct, [id, product]);
  }
);

export const deleteProductThunk = createAsyncThunk(
  'products/deleteProduct',
  async (id: string) => {
    await call(deleteProduct, [id]);
    return { id }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    return await call(getCategories, []);
  }
);

export const createCategoryThunk = createAsyncThunk(
  'categories/createCategory',
  async (category: ICategory) => {
    return await call(createCategory, [category]);
  }
);

export const updateCategoryThunk = createAsyncThunk(
  'categories/updateCategory',
  async ({ id, category }: { id: string, category: ICategory }) => {
    return await call(updateCategory, [id, category]);
  }
);

export const deleteCategoryThunk = createAsyncThunk(
  'categories/deleteCategory',
  async (id: string) => {
    await call(deleteCategory, [id]);
    return { id }
  }
);

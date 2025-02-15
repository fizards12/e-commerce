import { createAsyncThunk } from '@reduxjs/toolkit';
import { call } from '../../services/call';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../../services/products';
import { IProduct } from '../../schemas/product';
import store, { RootState } from '..';
import { GeneralError } from '../../services/error';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const state : RootState = store.getState();
    if(state.products.length === 0){
      return await call(getProducts, []);
    }
    return { products: Object.values(state.products.data) };
  }
);

export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (id: string, {rejectWithValue}) => {
    try{
      return await call(getProduct, [id]);

    }catch(error){
      return rejectWithValue(new GeneralError(error as GeneralError));
    }
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
  async (product: IProduct) => {
    return await call(updateProduct, [product.id, product]);
  }
);

export const deleteProductThunk = createAsyncThunk(
  'products/deleteProduct',
  async (id: string) => {
    await call(deleteProduct, [id]);
    return { id }
  }
);



import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../schemas/product';
import { ICategory } from '../../schemas/category';
import { fetchProducts, fetchProduct, fetchCategories, createCategoryThunk, updateCategoryThunk, deleteCategoryThunk, createProductThunk, updateProductThunk, deleteProductThunk } from './productsThunk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

interface ProductsState {
  products: IProduct[];
  categories: ICategory[];
}

const initialState: ProductsState = {
  products: [],
  categories: [],
};

const persistConfig = {
  key: 'products',
  storage,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<{ products: IProduct[] }>) => {
        state.products = action.payload.products;
      })
      .addCase(fetchProduct.fulfilled, (state: ProductsState,action: PayloadAction<{ product: IProduct }>) => {
        state.products = state.products.map((product) =>
          product.id === action.payload.product.id ? action.payload.product : product
        );
      })
      .addCase(createProductThunk.fulfilled, (state, action: PayloadAction<{ product: IProduct }>) => {
        state.products.push(action.payload.product);
      })
      .addCase(updateProductThunk.fulfilled, (state, action: PayloadAction<{ product: IProduct }>) => {
        state.products = state.products.map(product =>
          product.id === action.payload.product.id ? action.payload.product : product
        );
      })
      .addCase(deleteProductThunk.fulfilled, (state: ProductsState, action: PayloadAction<{ id: string }>) => {
        state.products = state.products.filter(product => product.id !== action.payload.id);
      })
      .addCase(fetchCategories.fulfilled, (state,action: PayloadAction<{ categories: ICategory[] }>) => {
        state.categories = action.payload.categories;
      })
      .addCase(createCategoryThunk.fulfilled, (state, action: PayloadAction<{ category: ICategory }>) => {
        state.categories.push(action.payload.category);
      })
      .addCase(updateCategoryThunk.fulfilled, (state, action : PayloadAction<{ category: ICategory }>) => {
        state.categories = state.categories.map(category =>
          category.id === action.payload.category.id ? action.payload.category : category
        );
      })
      .addCase(deleteCategoryThunk.fulfilled, (state : ProductsState, action : PayloadAction<{ id: string }>) => {
        state.categories = state.categories.filter(category => category.id !== action.payload.id);
      })
  },
});

const persistedProductsReducer = persistReducer(persistConfig, productsSlice.reducer);

export default persistedProductsReducer;

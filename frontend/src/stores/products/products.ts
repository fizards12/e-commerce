import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../schemas/product';
import { fetchProducts, fetchProduct, createProductThunk, updateProductThunk, deleteProductThunk } from './productsThunk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { normalizeArray } from '../../utils/utils';
import { RootState } from '..';

interface ProductsState {
  data: Record<string, IProduct>;
  length: number;
}

const initialState: ProductsState = {
  data: {},
  length: 0
};

const persistConfig = {
  key: 'products',
  storage,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    reset: (state) => {
      state.data = initialState.data
      state.length = initialState.length
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<{ products: IProduct[] }>) => {
        state.data = normalizeArray(action.payload.products);
        state.length = action.payload.products.length;
      })
      .addCase(fetchProduct.fulfilled, (state: ProductsState, action: PayloadAction<{ product: IProduct }>) => {
        state.data[String(action.payload.product.id)] = action.payload.product
      })
      .addCase(createProductThunk.fulfilled, (state, action: PayloadAction<{ product: IProduct }>) => {
        state.data[String(action.payload.product.id)] = action.payload.product;
        state.length += 1;
      })
      .addCase(updateProductThunk.fulfilled, (state, action: PayloadAction<{ product: IProduct }>) => {
        console.log(action.payload.product)
        state.data[String(action.payload.product.id)] = action.payload.product;
      })
      .addCase(deleteProductThunk.fulfilled, (state: ProductsState, action: PayloadAction<{ id: string }>) => {
        delete state.data[String(action.payload.id)];
        state.length -= 1;
      })
  },
});

export const { reset: resetProducts } = productsSlice.actions

const selectProducts = (state: RootState) => state.products.data;
const selectCategories = (state: RootState) => state.categories.data;

export const selectedProducts = createSelector(
  [selectProducts, selectCategories],
  (products, categories) =>
    Object.values(products).map((product) => ({
      ...product,
      category: categories[String(product.category)] || {},
    }))
);

const persistedProductsReducer = persistReducer(persistConfig, productsSlice.reducer);

export default persistedProductsReducer;

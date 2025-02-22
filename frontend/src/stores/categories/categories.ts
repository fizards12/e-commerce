import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from 'redux-persist/lib/storage';
import { ICategory } from "../../schemas/category";
import { createCategoryThunk, deleteCategoryThunk, fetchCategories, updateCategoryThunk } from "./categoriesThunk";
import { normalizeArray } from "../../utils/utils";

interface ProductsState {
    data: { [id: string] : ICategory};
    length: number,
  }
  
  const initialState: ProductsState = {
    data: {},
    length: 0
  };
  
  const persistConfig = {
    key: 'categories',
    storage,
  };
  
  const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
      reset(state){
        state.data = initialState.data;
        state.length = initialState.length;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchCategories.fulfilled, (state,action: PayloadAction<{ categories: ICategory[] }>) => {
          state.data = normalizeArray(action.payload.categories);
        })
        .addCase(createCategoryThunk.fulfilled, (state, action: PayloadAction<{ category: ICategory }>) => {
          state.data[String(action.payload.category.id)] = action.payload.category;
          state.length += 1
        })
        .addCase(updateCategoryThunk.fulfilled, (state, action : PayloadAction<{ category: ICategory }>) => {
          state.data[String(action.payload.category.id)]  = action.payload.category
        })
        .addCase(deleteCategoryThunk.fulfilled, (state : ProductsState, action : PayloadAction<{ id: string }>) => {
          delete state.data[String(action.payload.id)]
          state.length -= 1
        })
    },
  });
  export const { reset: resetCategories } = categoriesSlice.actions
  const persistedProductsReducer = persistReducer(persistConfig, categoriesSlice.reducer);
  
  export default persistedProductsReducer;
  
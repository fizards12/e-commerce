import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICategory } from "../../schemas/category";
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../../services/products";
import { call } from "../../services/call";
import store, { RootState } from "..";

export const fetchCategories = createAsyncThunk(
    'products/fetchCategories',
    async () => {
      const state : RootState = store.getState();
      if(Object.values(state.categories.data).length === 0){
        return await call(getCategories, []);
      }
      return { categories: Object.values(state.categories.data) };
    }
  );
  
  export const fetchCategory = createAsyncThunk(
    'products/fetchCategory',
    async (id: string) => {
      return await call(getCategory, [id]);
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
    async (category: ICategory) => {
      return await call(updateCategory, [category.id, category]);
    }
  );
  
  export const deleteCategoryThunk = createAsyncThunk(
    'categories/deleteCategory',
    async (id: string) => {
      await call(deleteCategory, [id]);
      return { id }
    }
  );
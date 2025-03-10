import { LoaderFunction } from "react-router-dom";
import store, { RootState } from "../../stores";
import { fetchProducts } from "../../stores/products/productsThunk";
import { fetchCategories } from "../../stores/categories/categoriesThunk";

export const categoriesLoader: LoaderFunction = async () => {
  const state: RootState = store.getState();
  if (!state.categories.data) {
    await store.dispatch(fetchCategories());
  }
};

export const productsLoader: LoaderFunction = async () => {
  const state: RootState = store.getState();
  if (!state.products.data){
    await store.dispatch(fetchProducts());
  }
};
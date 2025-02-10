import { LoaderFunction } from "react-router-dom";
import store, { RootState } from "../../stores";
import { fetchCategories, fetchProducts } from "../../stores/products/productsThunk";

export const categoriesLoader: LoaderFunction = async () => {
  const state: RootState = store.getState();
  if (state.products.categories.length === 0) {
    await store.dispatch(fetchCategories());
  }
};

export const productsLoader: LoaderFunction = async () => {
  const state: RootState = store.getState();
  if (state.products.products.length === 0){
    await store.dispatch(fetchProducts());
  }
};


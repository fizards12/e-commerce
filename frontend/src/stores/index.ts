import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import authReducer from './auth/auth';
import appReducer from './app/app';
import productsReducer from './products/products';
import categoriesReducer from './categories/categories';

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  products: productsReducer,
  categories: categoriesReducer
  // ...add other reducers here...
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDM) => getDM({
    serializableCheck: false
  }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

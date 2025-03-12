import { createAsyncThunk } from '@reduxjs/toolkit';
import { call } from '../../services/call';
import { getLoggedInUser, logout as logoutService } from '../../services/auth';
import { logout as logoutAction } from './auth';
import store, { persistor } from '..';
import { resetProducts } from '../products/products';
import { resetCategories } from '../categories/categories';
import { redirect } from 'react-router-dom';

export const logoutThunk = createAsyncThunk(
  'auth/logoutUser',
  async (_, { dispatch }) => {
    try {
      await call(logoutService, []);
      console.log("LoggedOut");
      dispatch(logoutAction());
      resetStores();
      persistor.purge();
      redirect('/auth/login');
    } catch (error) {
      console.log(error);
    }
  }
);

export const getLoggedIn = createAsyncThunk(
  'auth/getLoggedIn',
  async (_, { dispatch }) => {
    try {
      const { message } = await getLoggedInUser()
      console.log(message)
      return message
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
        dispatch(logoutThunk())
      }
    }
  })


function resetStores() {
  store.dispatch(resetProducts())
  store.dispatch(resetCategories())
}
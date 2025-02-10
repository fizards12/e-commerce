import { createAsyncThunk } from '@reduxjs/toolkit';
import { call } from '../../services/call';
import { logout as logoutService } from '../../services/auth';
import { logout as logoutAction } from './auth';

export const logoutThunk = createAsyncThunk(
  'auth/logoutUser',
  async (_, { dispatch }) => {
    try {
        await call(logoutService, []);
        dispatch(logoutAction());
    } catch (error) {
        console.log(error);
    }
  }
);

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../schemas/user';
import { PersistConfig, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

interface UserState {
  isAuthenticated: boolean;
  user: IUser | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  user: null,
};



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<IUser>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

const persistConfig : PersistConfig<UserState> = {
  key: 'auth',
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export default persistedAuthReducer;

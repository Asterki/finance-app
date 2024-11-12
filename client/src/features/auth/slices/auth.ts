import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../../../shared/types/models';

interface AuthState {
  currentUser: User | null;
  privKey: string | null;
  authStatus: 'authenticated' | 'unauthenticated' | 'loading' | 'error';
}

const initialState: AuthState = {
  currentUser: null,
  privKey: null,
  authStatus: 'loading',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    login: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.authStatus = 'authenticated';
    },
    logout: (state) => {
      state.currentUser = null;
      state.authStatus = 'unauthenticated';
      state.privKey = null;
    },
    setAuthStatus: (state, action: PayloadAction<'authenticated' | 'unauthenticated' | 'loading' | 'error'>) => {
      state.authStatus = action.payload;
    },
    setPrivKey: (state, action: PayloadAction<string>) => {
      state.privKey = action.payload;
    },
  },
});

export const { setUser, login, logout, setAuthStatus, setPrivKey } = authSlice.actions;
export default authSlice.reducer;

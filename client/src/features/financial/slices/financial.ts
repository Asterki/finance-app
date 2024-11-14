import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../../../shared/models';

interface AuthState {
  currentUser: User | null;
  authStatus: 'authenticated' | 'unauthenticated' | 'loading' | 'error';
}

const initialState: AuthState = {
  currentUser: null,
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
    },
    setAuthStatus: (state, action: PayloadAction<'authenticated' | 'unauthenticated' | 'loading' | 'error'>) => {
      state.authStatus = action.payload;
    },
  },
});

export const { setUser, login, logout, setAuthStatus } = authSlice.actions;
export default authSlice.reducer;

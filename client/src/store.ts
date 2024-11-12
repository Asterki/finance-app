import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './features/auth';
import { preferencesReducer } from './features/preferences';

const store = configureStore({
  reducer: {
    auth: authReducer,
    preferences: preferencesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

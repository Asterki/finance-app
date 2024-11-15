import { configureStore } from '@reduxjs/toolkit'

import { authReducer } from './features/auth'
import { preferencesReducer } from './features/preferences'
import { transactionsReducer } from './features/transactions'

const store = configureStore({
	reducer: {
		auth: authReducer,
		preferences: preferencesReducer,
		transactions: transactionsReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store

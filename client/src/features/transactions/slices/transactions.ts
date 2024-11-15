import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Transaction } from '../../../../../shared/models'

interface TransactionState {
	currentTransactions: Transaction[] | null
}

const initialState: TransactionState = {
	currentTransactions: null,
}

export const transactionSlice = createSlice({
	name: 'transactions',
	initialState,
	reducers: {
		setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.currentTransactions = action.payload
    },
	},
})

export const { setTransactions } = transactionSlice.actions
export default transactionSlice.reducer

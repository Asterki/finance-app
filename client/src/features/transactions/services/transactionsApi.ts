import axios from 'axios'

import { Transaction } from '../../../../../shared/models'
import * as Types from '../../../../../shared/api/transactions'

const apiEndpoint = `${import.meta.env.VITE_SERVER_HOST}/api/transactions`

const getBalance = async (): Promise<number> => {
	const response = await axios.get<Types.GetBalanceResponseData>(
		`${apiEndpoint}/getBalance`,
		{
			withCredentials: true,
		}
	)

	return response.data.balance
}

const createTransaction = async (
	date: string,
	type: 'income' | 'expense',
	amount: number,
	category: string,
	description: string,
	tags: string[]
): Promise<{
	status: 'success'
	transaction: Transaction
}> => {
	const response = await axios.post<Types.CreateTransactionResponseData>(
		`${apiEndpoint}/createTransaction`,
		{
			date,
			type,
			amount,
			category,
			description,
			tags,
		},
		{
			withCredentials: true,
		}
	)

	return response.data
}

const deleteTransaction = async (transactionID: string): Promise<'success'> => {
	const response = await axios.post<Types.DeleteTransactionResponseData>(
		`${apiEndpoint}/deleteTransaction`,
		{
			transactionID,
		},
		{
			withCredentials: true,
		}
	)

	return response.data.status
}

const getTransactionsByFilters = async ({
	count,
	dayCount,
	type,
	category,
}: Types.GetTransactionsRequestBody): Promise<Transaction[]> => {
	const response = await axios.post<Types.GetTransactionsResponseData>(
		`${apiEndpoint}/getTransactions`,
		{
			count,
			dayCount,
			type,
			category,
		},
		{
			withCredentials: true,
		}
	)
	return response.data.transactions
}

const getTransactionsByID = async (
	transactionID: string
): Promise<Transaction | 'transaction-not-found'> => {
	const response = await axios.post<Types.GetTransactionByIDResponseData>(
		`${apiEndpoint}/getTransaction`,
		{
			transactionID,
		},
		{
			withCredentials: true,
		}
	)

	if (response.data.status == 'success') return response.data.transaction
	return response.data.status
}

const updateTransaction = async (
	transactionID: string,
	amount: number,
	category: string,
	description: string,
	date: string,
	tags: string[]
): Promise<{
	status: 'success'
	transaction: Transaction
}> => {
	const response = await axios.post<Types.UpdateTransactionResponseData>(
		`${apiEndpoint}/updateTransaction`,
		{
			transactionID,
			amount,
			category,
			description,
			date,
			tags,
		},
		{
			withCredentials: true,
		}
	)

	return response.data
}

export default {
	getBalance,
	createTransaction,
	deleteTransaction,
	getTransactionsByFilters,
	getTransactionsByID,
	updateTransaction,
}

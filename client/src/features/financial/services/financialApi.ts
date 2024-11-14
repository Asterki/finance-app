import axios from 'axios'

import { Transaction } from '../../../../../shared/models'
import * as Types from '../../../../../shared/api/financial'

const apiEndpoint = `${import.meta.env.VITE_SERVER_HOST}/api/financial`

const getBalance = async (): Promise<number> => {
	const response = await axios.get<Types.GetBalanceResponseData>(
		`${apiEndpoint}/get-balance`,
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
		`${apiEndpoint}/delete-transaction`,
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
		`${apiEndpoint}/get-transactions`,
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
		`${apiEndpoint}/get-transaction-by-id`,
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
		`${apiEndpoint}/update-transaction`,
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

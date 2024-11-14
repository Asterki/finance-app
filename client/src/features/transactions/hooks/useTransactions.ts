import * as React from 'react'
import { isAxiosError } from 'axios'
import { ResponseError } from '../../../../../shared/models'

import { setTransactions } from '../slices/transactions'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'

import transactionsApi from '../services/transactionsApi'

const useFinancial = () => {
	const dispatch = useDispatch()
	const currentTransactions = useSelector(
		(state: RootState) => state.transactions.currentTransactions
	)

	const fetchTransactions = async () => {
		try {
			const transactions = await transactionsApi.getTransactionsByFilters(
				{
					count: 100,
				}
			)

			dispatch(setTransactions(transactions))
		} catch (error) {
			if (isAxiosError(error)) {
				const responseError = error.response?.data as ResponseError
				return responseError.message
			} else {
				// TODO: Handle unknown errors
				console.log(error)
				return 'unknown-error'
			}
		}
	}

	React.useEffect(() => {
		;(async () => {
			await fetchTransactions()
		})()
	})

	return { currentTransactions, fetchTransactions }
}

export default useFinancial

import TransactionsService from '../../services/transactions'

import { NextFunction, Request, Response } from 'express'
import {
	GetTransactionsRequestBody as RequestBody,
	GetTransactionsResponseData as ResponseData,
} from '../../../../shared/api/transactions'
import { User } from '@prisma/client'

const getTransactionsHandler = async (
	req: Request<{}, {}, RequestBody>,
	res: Response<ResponseData>,
	next: NextFunction
) => {
	try {
		const user = req.user as User
		const { category, count, dayCount, type } = req.body

		const transactions = await TransactionsService.getTransactions(user.id, {
			count,
			dayCount,
			type,
			category,
		})

		res.status(200).send({
			status: 'success',
			transactions,
		})
	} catch (error) {
		next(error)
	}
}

export default getTransactionsHandler

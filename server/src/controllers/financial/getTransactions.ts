import FinancialService from '../../services/financial'

import { NextFunction, Request, Response } from 'express'
import {
	GetTransactionsRequestBody as RequestBody,
	GetTransactionsResponseData as ResponseData,
} from '../../../../shared/api/financial'
import { User } from '@prisma/client'

const deleteTransactionHandler = async (
	req: Request<{}, {}, RequestBody>,
	res: Response<ResponseData>,
	next: NextFunction
) => {
	try {
		const user = req.user as User
		const { category, count, dayCount, type } = req.body

		const transactions = await FinancialService.getTransactions(user.id, {
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

export default deleteTransactionHandler

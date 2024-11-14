import TransactionsService from '../../services/transactions'

import { NextFunction, Request, Response } from 'express'
import {
	CreateTransactionRequestBody as RequestBody,
	CreateTransactionResponseData as ResponseData,
} from '../../../../shared/api/transactions'
import { User } from '@prisma/client'

const createTransactionHandler = async (
	req: Request<{}, {}, RequestBody>,
	res: Response<ResponseData>,
	next: NextFunction
) => {
	try {
		const user = req.user as User
		const { amount, category, date, description, tags, type } = req.body

		const transaction = await TransactionsService.createTransaction(
			user.id,
			type,
			amount,
			category,
			description,
			new Date(date),
			tags
		)

		res.status(200).send({
			status: 'success',
			transaction,
		})
	} catch (error) {
		next(error)
	}
}

export default createTransactionHandler

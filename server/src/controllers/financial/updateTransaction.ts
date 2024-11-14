import FinancialService from '../../services/financial'

import { NextFunction, Request, Response } from 'express'
import {
	UpdateTransactionRequestBody as RequestBody,
	UpdateTransactionResponseData as ResponseData,
} from '../../../../shared/api/financial'
import { User } from '@prisma/client'

const updateTransactionHandler = async (
	req: Request<{}, {}, RequestBody>,
	res: Response<ResponseData>,
	next: NextFunction
) => {
	try {
		const user = req.user as User
		const { amount, category, date, description, tags, transactionID } =
			req.body

		const transaction = await FinancialService.updateTransaction(
			user.id,
			transactionID,
			amount,
			category,
			description,
			date,
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

export default updateTransactionHandler

import TransactionsService from '../../services/transactions'

import { NextFunction, Request, Response } from 'express'
import {
	DeleteTransactionRequestBody as RequestBody,
	DeleteTransactionResponseData as ResponseData,
} from '../../../../shared/api/transactions'
import { User } from '@prisma/client'

const deleteTransactionHandler = async (
	req: Request<{}, {}, RequestBody>,
	res: Response<ResponseData>,
	next: NextFunction
) => {
	try {
		const user = req.user as User
		const { transactionID } = req.body

		const transaction = await TransactionsService.deleteTransaction(
			user.id,
            transactionID
		)

		res.status(200).send({
			status: 'success',
			transaction,
		})
	} catch (error) {
		next(error)
	}
}

export default deleteTransactionHandler

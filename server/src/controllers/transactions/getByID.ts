import TransactionsService from '../../services/transactions'

import { NextFunction, Request, Response } from 'express'
import {
	GetTransactionByIDRequestBody as RequestBody,
	GetTransactionByIDResponseData as ResponseData,
} from '../../../../shared/api/transactions'
import { User } from '@prisma/client'

import ResponseError from '../../utils/responseError'

const getTransactionByIDHandler = async (
	req: Request<{}, {}, RequestBody>,
	res: Response<ResponseData>,
	next: NextFunction
) => {
	try {
		const user = req.user as User
		const { transactionId } = req.body

		const transaction = await TransactionsService.getTransaction(
			user.id,
			transactionId
		)

		if (!transaction) {
			throw new ResponseError(
				404,
				'not-found',
				'The requested transaction was not found.'
			)
		} else {
			res.status(200).send({
				status: 'success',
				transaction,
			})
		}
	} catch (error) {
		next(error)
	}
}

export default getTransactionByIDHandler

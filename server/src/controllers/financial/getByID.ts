import FinancialService from '../../services/financial'

import { NextFunction, Request, Response } from 'express'
import {
	GetTransactionByIDRequestBody as RequestBody,
	GetTransactionByIDResponseData as ResponseData,
} from '../../../../shared/api/financial'
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

		const transaction = await FinancialService.getTransaction(
			transactionId,
			user.id
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

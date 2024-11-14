import FinancialService from '../../services/financial'

import { NextFunction, Request, Response } from 'express'
import {
	GetTransactionByIDRequestBody as RequestBody,
	GetTransactionByIDResponseData as ResponseData,
} from '../../../../shared/api/financial'
import { User } from '@prisma/client'

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
			res.status(200).send({
				status: 'transaction-not-found',
			})
		} else {
			res.status(200).send({
				status: 'success',
				transaction,
			})
		}
	} catch (err) {
		next(err)
	}
}

export default getTransactionByIDHandler

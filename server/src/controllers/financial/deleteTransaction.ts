import FinancialService from '../../services/financial'

import { NextFunction, Request, Response } from 'express'
import {
	DeleteTransactionRequestBody as RequestBody,
	DeleteTransactionResponseData as ResponseData,
} from '../../../../shared/api/financial'
import { User } from '@prisma/client'

const deleteTransactionHandler = async (
	req: Request<{}, {}, RequestBody>,
	res: Response<ResponseData>,
	next: NextFunction
) => {
	try {
		const user = req.user as User
		const { transactionID } = req.body

		const transaction = await FinancialService.deleteTransaction(
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

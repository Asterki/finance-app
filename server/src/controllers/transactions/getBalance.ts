import TransactionsService from '../../services/transactions'

import { NextFunction, Request, Response } from 'express'
import { GetBalanceResponseData as ResponseData } from '../../../../shared/api/transactions'
import { User } from '@prisma/client'

const getBalanceHandler = async (
	req: Request,
	res: Response<ResponseData>,
	next: NextFunction
) => {
	try {
		const user = req.user as User
		const balance = await TransactionsService.getBalance(user.id)

		res.status(200).send({
			status: 'success',
			balance,
		})
	} catch (error) {
		next(error)
	}
}

export default getBalanceHandler

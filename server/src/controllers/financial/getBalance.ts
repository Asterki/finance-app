import FinancialService from '../../services/financial'

import { NextFunction, Request, Response } from 'express'
import { GetBalanceResponseData as ResponseData } from '../../../../shared/api/financial'
import { User } from '@prisma/client'

const getBalanceHandler = async (
	req: Request,
	res: Response<ResponseData>,
	next: NextFunction
) => {
	try {
		const user = req.user as User
		const balance = await FinancialService.getBalance(user.id)

		res.status(200).send({
			status: 'success',
			balance,
		})
	} catch (error) {
		next(error)
	}
}

export default getBalanceHandler

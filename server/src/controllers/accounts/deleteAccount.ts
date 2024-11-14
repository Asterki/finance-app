import AccountService from '../../services/accounts'

import { NextFunction, Request, Response } from 'express'
import {
	DeleteAccountRequestBody as RequestBody,
	DeleteAccountResponseData as ResponseData,
} from '../../../../shared/api/accounts'
import { User } from '@prisma/client'

import ResponseError from '../../utils/responseError'

const handler = async (
	req: Request<{}, {}, RequestBody>,
	res: Response<ResponseData>,
	next: NextFunction
) => {
	try {
		const user = req.user as User
		const { password, tfaCode } = req.body

		const isValidPassword = await AccountService.authenticatePassword(
			user.id,
			password
		)
		if (isValidPassword) {
			const result = await AccountService.deleteUser(
				user.id,
				password,
				tfaCode
			)

			res.send(result)
		} else {
			throw new ResponseError(
				401,
				'invalid-password',
				'The provided password is incorrect.'
			)
		}
	} catch (error) {
		next(error)
	}
}

export default handler

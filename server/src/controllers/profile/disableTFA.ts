import ProfileService from '../../services/profile'
import AccountService from '../../services/accounts'

import { NextFunction, Request, Response } from 'express'
import {
	DisableTFAResponseData as ResponseData,
	DisableTFARequestBody as RequestBody,
} from '../../../../shared/api/profile'

import { User } from '@prisma/client'

const disableTFAHandler = async (
	req: Request<{}, {}, RequestBody>,
	res: Response<ResponseData>,
	next: NextFunction
) => {
	try {
		const { password } = req.body
		const user = req.user as User

		const validPassword = await AccountService.authenticatePassword(
			user.id,
			password
		)
		if (validPassword) {
			const result = await ProfileService.disableTwoFactorAuth(user.id)
			res.status(200).send(result)
		} else {
			res.status(200).send({ status: 'invalid-password' })
		}
	} catch (error) {
		next(error)
	}
}

export default disableTFAHandler

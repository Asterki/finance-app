import PreferencesService from '../../services/preferences'
import AccountService from '../../services/accounts'

import { NextFunction, Request, Response } from 'express'
import {
	DisableTFAResponseData as ResponseData,
	DisableTFARequestBody as RequestBody,
} from '../../../../shared/api/preferences'
import { User } from '@prisma/client'

import ResponseError from '../../utils/responseError'

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
			const result = await PreferencesService.disableTwoFactorAuth(
				user.id
			)
			res.status(200).send(result)
		} else {
			throw new ResponseError(
				403,
				'invalid-password',
				'The provided password is incorrect.'
			)
		}
	} catch (error) {
		next(error)
	}
}

export default disableTFAHandler

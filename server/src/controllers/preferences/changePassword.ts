import PreferencesService from '../../services/preferences'

import { NextFunction, Request, Response } from 'express'
import {
	ChangePasswordResponseData as ResponseData,
	ChangePasswordRequestBody as RequestBody,
} from '../../../../shared/api/preferences'

import ResponseError from '../../utils/responseError'

import { User } from '@prisma/client'

const changePasswordHandler = async (
	req: Request<{}, {}, RequestBody>,
	res: Response<ResponseData>,
	next: NextFunction
) => {
	try {
		const { oldPassword, newPassword } = req.body
		const user = req.user as User

		const result = await PreferencesService.changePassword(
			user.id,
			oldPassword,
			newPassword
		)

		if (result == 'invalid-password')
			throw new ResponseError(
				409,
				'invalid-password',
				'The password you provided is incorrect'
			)

		res.status(200).send({ status: result })
	} catch (error) {
		next(error)
	}
}

export default changePasswordHandler

import PreferencesService from '../../services/preferences'

import { NextFunction, Request, Response } from 'express'
import {
	ChangePasswordResponseData as ResponseData,
	ChangePasswordRequestBody as RequestBody,
} from '../../../../shared/api/preferences'

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

		res.json(result)
	} catch (error) {
		next(error)
	}
}

export default changePasswordHandler

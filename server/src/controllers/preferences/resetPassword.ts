import PreferencesService from '../../services/preferences'

import { NextFunction, Request, Response } from 'express'
import {
	ResetPasswordResponseData as ResponseData,
	ResetPasswordRequestBody as RequestBody,
} from '../../../../shared/api/preferences'

const resetPasswordHandler = async (
	req: Request<{}, {}, RequestBody>,
	res: Response<ResponseData>,
	next: NextFunction
) => {
	try {
		const { resetToken, newPassword } = req.body

		const result = await PreferencesService.recoverPassword(
			resetToken,
			newPassword
		)

		res.send({
			status: result.status,
		})
	} catch (error) {
		next(error)
	}
}

export default resetPasswordHandler

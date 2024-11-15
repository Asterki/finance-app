import PreferencesService from '../../services/preferences'

import { NextFunction, Request, Response } from 'express'
import {
	ResetPasswordResponseData as ResponseData,
	ResetPasswordRequestBody as RequestBody,
} from '../../../../shared/api/preferences'

import ResponseError from '../../utils/responseError'

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

		if (result == "invalid-reset-token") throw new ResponseError(400, "invalid-reset-token", "The provided reset token is invalid.")
		res.send({
			status: result,
		})
	} catch (error) {
		next(error)
	}
}

export default resetPasswordHandler

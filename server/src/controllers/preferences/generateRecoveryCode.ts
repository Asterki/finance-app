import PreferencesService from '../../services/preferences'
import EmailService from '../../services/email'

import { NextFunction, Request, Response } from 'express'
import {
	GenerateRecoveryCodeResponseData as ResponseData,
	GenerateRecoveryCodeRequestBody as RequestBody,
} from '../../../../shared/api/preferences'

import ResponseError from '../../utils/responseError'

const generateRecoveryCodeHandler = async (
	req: Request<{}, {}, RequestBody>,
	res: Response<ResponseData>,
	next: NextFunction
) => {
	try {
		const { email } = req.body

		const result = await PreferencesService.generateRecoveryCode(email)

		if (result.status == 'user-not-found')
			throw new ResponseError(404, result.status)

		const preferencesResult = await PreferencesService.getPreferences(
			result.user.id
		)
		if (!preferencesResult)
			throw new ResponseError(
				500,
				'internal-error',
				"Couldn't fetch user preferences."
			)

		const template = await EmailService.getEmailHTMLTemplate(
			'resetPassword',
			preferencesResult.preferences.language,
			{
				recoveryCode: result.recoveryCode,
				name: result.user.name,
				email: result.user.email,
			}
		)

		await EmailService.sendMail(
			result.user.email,
			'Reset Password',
			template
		)
	} catch (error) {
		next(error)
	}
}

export default generateRecoveryCodeHandler

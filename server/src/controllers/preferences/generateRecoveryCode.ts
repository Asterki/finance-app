import PreferencesService from '../../services/preferences'
import EmailService from '../../services/email'

import { NextFunction, Request, Response } from 'express'
import {
	ResetPasswordResponseData as ResponseData,
	ResetPasswordRequestBody as RequestBody,
} from '../../../../shared/api/preferences'

const generateRecoveryCode = async (
	req: Request<{}, {}, RequestBody>,
	res: Response<ResponseData>,
	next: NextFunction
) => {
	try {
		const { email } = req.body

		const result = await PreferencesService.generateRecoveryCode(email)
		if (result.status == 'success' && result.recoveryCode && result.user) {
            const preferencesResult = await PreferencesService.getPreferences(result.user.id)
            if (!preferencesResult) {
                res.send({
                    status: 'internal-error',
                })
            } else {
                const template = await EmailService.getEmailHTMLTemplate("resetPassword", preferencesResult.preferences.language, {
                    recoveryCode: result.recoveryCode,
                    name: result.user.name,
                    email: result.user.email,
                })

                await EmailService.sendMail(
                    result.user.email,
                    "Reset Password",
                    template,
                )
            }
		} else {
			res.send({
				status: result.status,
			})
		}
	} catch (error) {
		next(error)
	}
}

export default generateRecoveryCode

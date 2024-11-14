import AccountService from '../../services/accounts'

import { NextFunction, Request, Response } from 'express'
import {
	RegisterRequestBody as RequestBody,
	RegisterResponseData as ResponseData,
} from '../../../../shared/api/accounts'

import ResponseError from '../../utils/responseError'

const registerHandler = async (
	req: Request<{}, {}, RequestBody>,
	res: Response<ResponseData>,
	next: NextFunction
) => {
	try {
		const { email, name, password, currency, language, timezone } = req.body

		const result = await AccountService.registerUser(
			name,
			email,
			password,
			currency,
			language,
			timezone
		)

		if (result.status === 'user-exists') {
			throw new ResponseError(
				409,
				'user-exists',
				'The provided email is already in use.'
			)
		} else {
			req.login(result.user, (err) => {
				res.status(200).send({
					status: 'success',
				})
			})
		}
	} catch (error) {
		next(error)
	}
}

export default registerHandler

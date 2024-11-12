import AccountService from '../../services/accounts'

import { NextFunction, Request, Response } from 'express'
import {
	RegisterRequestBody as RequestBody,
	RegisterResponseData as ResponseData,
} from '../../../../shared/api/accounts'

import CustomError from '../../utils/customError'

const handler = async (
	req: Request<{}, {}, RequestBody>,
	res: Response<ResponseData>,
	next: NextFunction
) => {
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
		res.status(200).send({
			status: 'user-exists',
		})
	} else if (result.status === 'internal-error') {
		throw new CustomError(500, 'Internal error')
	} else {
		req.login(result.user!, (err) => {
			res.status(200).send({
				status: 'success',
			})
		})
	}
}

export default handler

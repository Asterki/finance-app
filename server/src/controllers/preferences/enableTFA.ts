import PreferencesService from '../../services/preferences'

import { NextFunction, Request, Response } from 'express'
import {
	EnableTFAResponseData as ResponseData,
	EnableTFARequestBody as RequestBody,
} from '../../../../shared/api/preferences'

import ResponseError from '../../utils/responseError'

import { User } from '@prisma/client'

const enableTFAHandler = async (
	req: Request<{}, {}, RequestBody>,
	res: Response<ResponseData>,
	next: NextFunction
) => {
	try {
		const { code, secret } = req.body
		const user = req.user as User

		const result = await PreferencesService.activateTwoFactorAuth(
			user.id,
			secret,
			code
		)

		if (result == 'invalid-code')
			throw new ResponseError(
				400,
				'invalid-code',
				'The provided TFA code is invalid.'
			)

		res.status(200).send({ status: result })
	} catch (error) {
		next(error)
	}
}

export default enableTFAHandler

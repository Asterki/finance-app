import ProfileService from '../../services/profile'

import { NextFunction, Request, Response } from 'express'
import {
	EnableTFAResponseBody as ResponseData,
	EnableTFARequestBody as RequestBody,
} from '../../../../shared/api/profile'

import { User } from '@prisma/client'

const enableTFAHandler = async (
	req: Request<{}, {}, RequestBody>,
	res: Response<ResponseData>,
	next: NextFunction
) => {
	try {
        const { code, secret } = req.body
		const user = req.user as User

        const result = await ProfileService.activateTwoFactorAuth(user.id, secret, code)
		return res.status(200).send(result)
	} catch (error) {
		next(error)
	}
}

export default enableTFAHandler

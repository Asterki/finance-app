import AccountService from '../../services/accounts'

import { NextFunction, Request, Response } from 'express'
import {
	DeleteAccountRequestBody as RequestBody,
	DeleteAccountResponseData as ResponseData,
} from '../../../../shared/api/accounts'
import { User } from '@prisma/client'

const handler = async (
	req: Request<{}, {}, RequestBody>,
	res: Response<ResponseData>,
	next: NextFunction
) => {
	const user = req.user as User
	const { password, tfaCode } = req.body

	try {
		const isValidPassword = await AccountService.authenticatePassword(
			user.id,
			password
		)
		if (isValidPassword) {
			const result = await AccountService.deleteUser(
				user.id,
				password,
				tfaCode
			)

            res.send(result)
		} else {
			res.status(401).json({ status: 'invalid-password' })
		}
	} catch (error) {
		next()
	}
}

export default handler

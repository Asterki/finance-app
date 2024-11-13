import speakeasy from 'speakeasy'

import { NextFunction, Request, Response } from 'express'
import { GenerateTFASecretResponseData as ResponseData } from '../../../../shared/api/preferences'

const generateTFASecretHandler = async (
	req: Request,
	res: Response<ResponseData>,
	next: NextFunction
) => {
	try {
		const secret = speakeasy.generateSecret({
			length: 20,
			name: 'My App',
			issuer: 'My Company',
		}).base32

		res.json({
			status: 'success',
			secret,
		})
	} catch (error) {
		next(error)
	}
}

export default generateTFASecretHandler

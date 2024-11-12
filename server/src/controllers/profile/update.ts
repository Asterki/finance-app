import ProfileService from '../../services/profile'

import { NextFunction, Request, Response } from 'express'
import {
	UpdateProfileResponseData as ResponseData,
	UpdateProfileRequestBody as RequestBody,
} from '../../../../shared/api/profile'

import { User } from '@prisma/client'

const profileUpdateHandler = async (
	req: Request<{}, {}, RequestBody>,
	res: Response<ResponseData>,
	next: NextFunction
) => {
	try {
		const { currency, language, theme, timezone } = req.body
		const user = req.user as User

		const result = await ProfileService.updateUserProfile(user.id, {
			currency,
			language,
			theme,
			timezone,
		})

		res.status(200).send(result)
	} catch (error) {
		next(error)
	}
}

export default profileUpdateHandler

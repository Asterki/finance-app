import PreferencesService from '../../services/preferences'

import { NextFunction, Request, Response } from 'express'
import { FetchPreferencesResponseData as ResponseData } from '../../../../shared/api/preferences'

import { User } from '@prisma/client'

const profileUpdateHandler = async (
	req: Request,
	res: Response<ResponseData>,
	next: NextFunction
) => {
	try {
		const user = req.user as User
		const result = await PreferencesService.getPreferences(user.id)

		if (!result) {
			res.status(200).send({
				status: 'unauthenticated',
			})
			return
		}

		res.status(200).send({
			status: 'success',
			preferences: result,
		})
	} catch (error) {
		next(error)
	}
}

export default profileUpdateHandler

import PreferencesService from '../../services/preferences'

import { NextFunction, Request, Response } from 'express'
import { FetchPreferencesResponseData as ResponseData } from '../../../../shared/api/preferences'
import { User } from '@prisma/client'

import ResponseError from '../../utils/responseError'

const profileUpdateHandler = async (
	req: Request,
	res: Response<ResponseData>,
	next: NextFunction
) => {
	try {
		const user = req.user as User
		const result = await PreferencesService.getPreferences(user.id)

		if (!result)
			throw new ResponseError(
				404,
				'not-found',
				'The requested preferences were not found.'
			) // Although this is not supposed to happen

		res.status(200).send({
			status: 'success',
			preferences: result,
		})
	} catch (error) {
		next(error)
	}
}

export default profileUpdateHandler

import { NextFunction, Request, Response } from 'express'
import { FetchResponseData as ResponseData } from '../../../../shared/api/accounts'

import { User, UserPreferences } from '@prisma/client'

const fetchHandler = (
	req: Request,
	res: Response<ResponseData>,
	next: NextFunction
) => {
	try {
		const user = req.user as User & { preferences: UserPreferences } // Inherited from serialize (See src/services/sessions.ts)

		res.status(200).send({
			status: 'success',
			user: user,
		})
	} catch (error) {
		next(error)
	}
}

export default fetchHandler

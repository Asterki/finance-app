import passport from 'passport'

import { NextFunction, Request, Response } from 'express'
import {
	LoginResponseData as ResponseData,
	LoginRequestBody as RequestBody,
} from '../../../../shared/api/accounts'

const handler = (
	req: Request<{}, {}, RequestBody>,
	res: Response<ResponseData>,
	next: NextFunction
) => {
	passport.authenticate('local', (err: any, user: any, info: any) => {
		if (err) return next(err)
		if (!user) {
			res.status(200).send({
				status: info.message,
			})
		} else {
			req.logIn(user, (err) => {
				if (err) return next(err)
				res.status(200).send({
					status: 'success',
				})
			})

		}
			

	})(req, res, next)
}

export default handler
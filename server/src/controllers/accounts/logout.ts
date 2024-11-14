import { NextFunction, Request, Response } from 'express'
import { LogoutResponseData as ResponseData } from '../../../../shared/api/accounts'

const handler = async (
	req: Request,
	res: Response<ResponseData>,
	next: NextFunction
) => {
	try {
		req.logOut({ keepSessionInfo: false }, (err) => {
			if (err) return next(err)
			return res.send({
				status: 'success',
			})
		})
	} catch (error) {
		next(error)
	}
}

export default handler

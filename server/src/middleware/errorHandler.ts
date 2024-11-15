import { NextFunction, Request, Response } from 'express'
import ResponseError from '../utils/responseError'

import logger from '../utils/logger'

const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof ResponseError) {
		if (err.statusCode === 500) {
			logger.error(err.message as string, true)
		}

		res.status(err.statusCode).send({
			status: err.errorCode,
			message: err.message,
		})
	} else {
		logger.error(err.stack as string, true)

		res.status(500).send({
			status: 'error',
			message: 'server-error',
		})
	}
}

export default errorHandler

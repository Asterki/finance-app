import { NextFunction, Request, Response } from 'express'
import CustomError from '../utils/customError'

const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof CustomError) {
		res.status(err.statusCode).send({
			status: 'error',
			message: err.errorCode,
		})
	} else {
		res.status(500).send({
			status: 'error',
			message: 'server-error',
		})
	}
}

export default errorHandler

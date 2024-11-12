import { NextFunction, Request, Response } from 'express'

const loggingMiddleware = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log(
		`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`
	)
	next()
}

export default loggingMiddleware

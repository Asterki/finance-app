class ResponseError extends Error {
	statusCode: number
	errorCode: string

	constructor(statusCode: number, errorCode: string, message?: string) {
		super(message)
		this.statusCode = statusCode
		this.errorCode = errorCode
		Error.captureStackTrace(this, this.constructor)
	}
}

export default ResponseError

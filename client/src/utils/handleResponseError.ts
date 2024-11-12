import { AxiosError } from 'axios'

const handleResponseError = (
	error: AxiosError
):
	| 'unauthenticated'
	| 'forbidden'
	| 'not-found'
	| 'server-error'
	| 'unknown-error'
	| 'bad-request' => {
	switch (error.response?.status) {
		case 400:
			return 'bad-request'
		case 401:
			return 'unauthenticated'
		case 403:
			return 'forbidden'
		case 404:
			return 'not-found'
		case 500:
			return 'server-error'
		default:
			return 'unknown-error'
	}
}

export default handleResponseError

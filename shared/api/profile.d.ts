export interface EnableTFARequestBody {
	code: string
	secret: string
}

export interface EnableTFAResponseBody {
	status: 'success' | 'invalid-code' | 'internal-error' | 'invalid-tfa-secret'
}

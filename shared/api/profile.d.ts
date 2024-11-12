export interface EnableTFARequestBody {
	code: string
	secret: string
}

export interface EnableTFAResponseBody {
	status: 'success' | 'invalid-code' | 'internal-error' | 'invalid-tfa-secret'
}

export interface DisableTFARequestBody {
	password: string
}

export interface DisableTFAResponseBody {
	status: 'success' | 'internal-error' | 'invalid-password'
}

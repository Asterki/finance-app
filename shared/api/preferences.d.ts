import { UserPreferences, Security } from '../models'

export interface EnableTFARequestBody {
	code: string
	secret: string
}

export interface EnableTFAResponseData {
	status: 'success' | 'invalid-code' | 'internal-error' | 'invalid-tfa-secret'
}

export interface DisableTFARequestBody {
	password: string
}

export interface DisableTFAResponseData {
	status: 'success' | 'internal-error' | 'invalid-password'
}

export interface UpdateProfileRequestBody {
	currency: string
	timezone: string
	theme: 'light' | 'dark'
	language: string
}

export interface UpdateProfileResponseData {
	status: 'success' | 'internal-error' | 'invalid-parameters'
}

export interface FetchPreferencesResponseData {
	status: 'success' | 'internal-error' | 'unauthenticated'
	preferences?: {
		preferences: UserPreferences
		security: Security
	}
}

export interface ChangePasswordRequestBody {
	oldPassword: string
	newPassword: string
}

export interface ChangePasswordResponseData {
	status: 'success' | 'internal-error' | 'invalid-password'
}

export interface ResetPasswordRequestBody {
	email: string
}

export interface ResetPasswordResponseData {
	status: 'success' | 'internal-error' | 'user-not-found'
}

import { UserPreferences, Security } from '../models'

export interface EnableTFARequestBody {
	code: string
	secret: string
}

export interface EnableTFAResponseData {
	status: 'success' | 'invalid-code' | 'invalid-tfa-secret'
}

export interface DisableTFARequestBody {
	password: string
}

export interface DisableTFAResponseData {
	status: 'success' | 'invalid-password'
}

export interface UpdateProfileRequestBody {
	currency: string
	timezone: string
	theme: 'light' | 'dark'
	language: string
}

export interface UpdateProfileResponseData {
	status: 'success' | 'invalid-parameters'
}

export type FetchPreferencesResponseData = | 
	{
		status: 'success'
		preferences: {
			preferences: UserPreferences
			security: Security
		}
	}
	| {
		status: 'unauthenticated'
		preferences: null
	}

export interface ChangePasswordRequestBody {
	oldPassword: string
	newPassword: string
}

export interface ChangePasswordResponseData {
	status: 'success' | 'invalid-password'
}

export interface GenerateRecoveryCodeRequestBody {
	email: string
}

export interface GenerateRecoveryCodeResponseData {
	status: 'success' | 'user-not-found'
}

export interface ResetPasswordRequestBody {
	resetToken: string
	newPassword: string
}

export interface ResetPasswordResponseData {
	status: 'success' | 'invalid-reset-token'
}

export interface GenerateTFASecretResponseData {
	status: 'success'
	secret?: string
}
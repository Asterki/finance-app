import { User } from '../models'

export interface FetchResponseData {
	status: 'success' | 'unauthenticated'
	user?: User
}

export interface LogoutResponseData {
	status: 'success' | 'unauthenticated'
}

export interface LoginRequestBody {
	email: string
	password: string
	tfaCode?: string
}

export interface LoginResponseData {
	status:
		| 'success'
		| 'unauthenticated'
		| 'invalid-credentials'
		| 'tfa-required'
		| 'invalid-tfa-code'
}

export interface RegisterRequestBody {
	email: string
	name: string
	password: string
	currency: string
	language: string
	timezone: string
}

export interface RegisterResponseData {
	status: 'success' | 'user-exists' | 'internal-error'
}


export interface DeleteAccountRequestBody {
	password: string
	tfaCode?: string
}

export interface DeleteAccountResponseData {
	status: "invalid-password" | "internal-error" | "invalid-tfa" | "success";
}
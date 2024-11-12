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
  status: 'success' | 'unauthenticated' | 'invalid-credentials' | 'tfa-required' 
}
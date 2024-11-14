import axios from 'axios'
import handleResponseError from '../../../utils/handleResponseError'

import * as Types from '../../../../../shared/api/financial'

const apiEndpoint = `${import.meta.env.VITE_SERVER_HOST}/api/financial`

const fetchUser = async () => {
	try {
		const res = await axios.get<Types.FetchResponseData>(`${apiEndpoint}/me`, {
			withCredentials: true,
		})

		return {
			status: res.data.status,
			user: res.data.status === 'success' ? res.data.user : null,
		}
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return {
				status: handleResponseError(error),
				user: null,
			}
		} else {
			return {
				status: 'unknown-error',
				user: null,
			}
		}
	}
}

const logout = async () => {
	try {
		const response = await axios.post<Types.LogoutResponseData>(
			`${apiEndpoint}/logout`,
			{},
			{
				withCredentials: true,
			}
		)
		return response.data.status == 'success'
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (err) {
		return false
	}
}

const login = async (email: string, password: string, tfaCode: string = '') => {
	try {
		const res = await axios.post<Types.LoginResponseData>(
			`${apiEndpoint}/login`,
			{
				email,
				password,
				tfaCode,
			} as Types.LoginRequestBody,
			{
				withCredentials: true,
			}
		)
		return res.data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return {
				status: handleResponseError(error),
			}
		} else {
			return {
				status: 'unknown-error',
			}
		}
	}
}

const register = async (
	name: string,
	email: string,
	password: string,
	currency: string,
	language: string,
	timezone: string
) => {
	try {
		const res = await axios.post<Types.RegisterResponseData>(
			`${apiEndpoint}/register`,
			{
				name,
				email,
				password,
				currency,
				language,
				timezone,
			} as Types.RegisterRequestBody,
			{
				withCredentials: true,
			}
		)
		return res.data.status
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return handleResponseError(error)
		} else {
			return 'unknown-error'
		}
	}
}

export default { fetchUser, logout, login, register }

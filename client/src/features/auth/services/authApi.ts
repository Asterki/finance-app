import axios from 'axios'
import * as Types from '../../../../../shared/api/accounts'

const apiEndpoint = `${import.meta.env.VITE_SERVER_HOST}/api/accounts`

const fetchUser = async () => {
	const res = await axios.get<Types.FetchResponseData>(`${apiEndpoint}/me`, {
		withCredentials: true,
	})

	if (res.data.status == 'unauthenticated') {
		return {
			status: res.data.status,
			user: null,
		}
	} else {
		return {
			status: res.data.status,
			user: res.data.user,
		}
	}
}

const logout = async () => {
	const response = await axios.post<Types.LogoutResponseData>(
		`${apiEndpoint}/logout`,
		{},
		{
			withCredentials: true,
		}
	)
	return response.data.status == 'success'
}

const login = async (email: string, password: string, tfaCode: string = '') => {
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
}

const register = async (
	name: string,
	email: string,
	password: string,
	currency: string,
	language: string,
	timezone: string
) => {
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
}

export default { fetchUser, logout, login, register }

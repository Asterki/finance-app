import axios from 'axios'
import * as Types from '../../../../../shared/api/preferences'

const apiEndpoint = `${import.meta.env.VITE_SERVER_HOST}/api/preferences`

const enableTFA = async (code: string, secret: string) => {
	const response = await axios.post<Types.EnableTFAResponseData>(
		`${apiEndpoint}/enableTFA`,
		{
			code,
			secret,
		} as Types.EnableTFARequestBody,
		{
			withCredentials: true,
		}
	)

	return response.data.status
}

const disableTFA = async (password: string) => {
	const response = await axios.post<Types.DisableTFAResponseData>(
		`${apiEndpoint}/disableTFA`,
		{
			password,
		} as Types.DisableTFARequestBody,
		{
			withCredentials: true,
		}
	)

	return response.data.status
}

const updateProfile = async (profile: {
	language: string
	currency: string
	theme: string
	timezone: string
}) => {
	const response = await axios.post<Types.UpdateProfileResponseData>(
		`${apiEndpoint}/update`,
		profile as Types.UpdateProfileRequestBody,
		{
			withCredentials: true,
		}
	)

	return response.data.status
}

const fetchPreferences = async () => {
	const response = await axios.get<Types.FetchPreferencesResponseData>(
		`${apiEndpoint}/fetch`,
		{
			withCredentials: true,
		}
	)

	if (response.data.status == 'success') return response.data.preferences
	return null
}

const changePassword = async (
	oldPassword: string,
	newPassword: string
): Promise<Types.ChangePasswordResponseData['status']> => {
	const response = await axios.post<Types.ChangePasswordResponseData>(
		`${apiEndpoint}/changePassword`,
		{
			oldPassword,
			newPassword,
		} as Types.ChangePasswordRequestBody,
		{
			withCredentials: true,
		}
	)

	return response.data.status
}

const generateRecoveryCode = async (email: string) => {
	const response = await axios.post<Types.GenerateRecoveryCodeResponseData>(
		`${apiEndpoint}/generateRecoveryCode`,
		{ email } as Types.GenerateRecoveryCodeRequestBody,
		{
			withCredentials: true,
		}
	)

	return response.data.status
}

const resetPassword = async (resetToken: string, newPassword: string) => {
	const response = await axios.post<Types.ChangePasswordResponseData>(
		`${apiEndpoint}/resetPassword`,
		{
			resetToken,
			newPassword,
		} as Types.ResetPasswordRequestBody,
		{
			withCredentials: true,
		}
	)

	return response.data.status
}

const generateTFASecret = async () => {
	const response = await axios.get<Types.GenerateTFASecretResponseData>(
		`${apiEndpoint}/generateTFASecret`,
		{
			withCredentials: true,
		}
	)

	return response.data.secret
}

export default {
	enableTFA,
	disableTFA,
	updateProfile,
	fetchPreferences,
	changePassword,
	generateRecoveryCode,
	resetPassword,
	generateTFASecret,
}

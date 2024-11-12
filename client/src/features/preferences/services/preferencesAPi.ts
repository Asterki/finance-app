import axios from 'axios'
import handleResponseError from '../../../utils/handleResponseError'

const apiEndpoint = `${import.meta.env.VITE_SERVER_HOST}/api/preferences`

const enableTFA = async (code: string, secret: string) => {
	try {
		const response = await axios.post(
			`${apiEndpoint}/enableTFA`,
			{
				code,
				secret,
			},
			{
				withCredentials: true,
			}
		)

		return {
			status: response.data.status,
		}
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

const disableTFA = async (password: string) => {
	try {
		const response = await axios.post(
			`${apiEndpoint}/disableTFA`,
			{
				password,
			},
			{
				withCredentials: true,
			}
		)

		return {
			status: response.data.status,
		}
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

const updateProfile = async (profile: {
	language: string
	currency: string
	theme: string
	timezone: string
}) => {
	try {
		const response = await axios.post(`${apiEndpoint}/update`, profile, {
			withCredentials: true,
		})

		return {
			status: response.data.status,
		}
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

export default {
	enableTFA,
	disableTFA,
	updateProfile,
}

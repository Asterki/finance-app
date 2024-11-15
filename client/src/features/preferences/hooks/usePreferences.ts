import * as React from 'react'
import { isAxiosError } from 'axios'
import { ResponseError } from '../../../../../shared/models'

import preferencesApi from '../services/preferencesApi'
import { setPreferences } from '../slices/preferences'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'

const usePreferences = () => {
	const dispatch = useDispatch()
	const currentPreferences = useSelector(
		(state: RootState) => state.preferences.currentPreferences
	)

	const updateProfile = async (newPreferences: {
		currency: string
		language: string
		theme: string
		timezone: string
	}) => {
		return await preferencesApi.updateProfile(newPreferences)
	}

	const generateTFASecret = async () => {
		try {
			return await preferencesApi.generateTFASecret()
		} catch (error) {
			if (isAxiosError(error)) {
				const responseError = error.response?.data as ResponseError
				return responseError.message
			} else {
				// TODO: Handle unknown errors
				console.log(error)
				return 'unknown-error'
			}
		}
	}

	const enableTFA = async (code: string, secret: string) => {
		try {
			return await preferencesApi.enableTFA(code, secret)
		} catch (error) {
			if (isAxiosError(error)) {
				const responseError = error.response?.data as ResponseError
				return responseError.message
			} else {
				// TODO: Handle unknown errors
				console.log(error)
				return 'unknown-error'
			}
		}
	}

	const disableTFA = async (password: string) => {
		try {
			return await preferencesApi.disableTFA(password)
		} catch (error) {
			if (isAxiosError(error)) {
				const responseError = error.response?.data as ResponseError
				return responseError.message
			} else {
				// TODO: Handle unknown errors
				console.log(error)
				return 'unknown-error'
			}
		}
	}

	const fetchPreferences = async () => {
		try {
			const result = await preferencesApi.fetchPreferences()
			if (result) {
				dispatch(
					setPreferences({
						security: result.security,
						user: result.preferences,
					})
				)
			} // We do not account for null-value preferences, as they usually come with an error status code
		} catch (error) {
			if (isAxiosError(error)) {
				const responseError = error.response?.data as ResponseError
				return responseError.message
			} else {
				// TODO: Handle unknown errors
				console.log(error)
				return 'unknown-error'
			}
		}
	}

	const changePassword = async (oldPassword: string, newPassword: string) => {
		try {
			return await preferencesApi.changePassword(oldPassword, newPassword)
		} catch (error) {
			if (isAxiosError(error)) {
				const responseError = error.response?.data as ResponseError
				return responseError.message
			} else {
				// TODO: Handle unknown errors
				console.log(error)
				return 'unknown-error'
			}
		}
	}

	React.useEffect(() => {
		;(async () => {
			await fetchPreferences()
		})()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return {
		preferences: currentPreferences,
		updateProfile,
		generateTFASecret,
		enableTFA,
		fetchPreferences,
		disableTFA,
		changePassword,
	}
}

export default usePreferences

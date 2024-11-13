import * as React from 'react'

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
		return await preferencesApi.generateTFASecret()
	}

	const enableTFA = async (code: string, secret: string) => {
		return await preferencesApi.enableTFA(code, secret)
	}

	const disableTFA = async (password: string) => {
		return await preferencesApi.disableTFA(password)
	}

	const fetchPreferences = async () => {
		const response = await preferencesApi.fetchPreferences()
		if (response.status === 'success') {
			dispatch(
				setPreferences({
					security: response.preferences!.security,
					user: response.preferences!.preferences,
				})
			)
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
	}
}

export default usePreferences

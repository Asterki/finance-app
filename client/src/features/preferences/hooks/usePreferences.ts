import * as React from 'react'

import preferencesApi from '../services/preferencesApi'

const usePreferences = () => {
	const [preferences, setPreferences] = React.useState({
		currency: 'USD',
		language: 'en',
		theme: 'light',
		timezone: 'UTC',
	})

	const updateProfile = async (newPreferences: {
		currency: string
		language: string
		theme: string
		timezone: string
	}) => {
		return await preferencesApi.updateProfile(newPreferences)
	}

	React.useEffect(() => {
		;(async () => {
			const response = await preferencesApi.fetchPreferences()
			if (response.status === 'success') {
				setPreferences(response.preferences)
			}
		})()
	}, [])

	return {
		preferences,
		updateProfile,
	}
}

export default usePreferences

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

	React.useEffect(() => {
		;(async () => {
			const response = await preferencesApi.fetchPreferences()
			if (response.status === 'success') {
				dispatch(setPreferences({
					security: response.preferences!.security,
					user: response.preferences!.preferences,
				}))
			}
		})()
	}, [])

	return {
		preferences: currentPreferences,
		updateProfile,
	}
}

export default usePreferences

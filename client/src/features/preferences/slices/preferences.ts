import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserPreferences, Security } from '../../../../../shared/models'

interface PreferencesState {
	currentPreferences: {
		security: Security
		user: UserPreferences
	} | null
}

const initialState: PreferencesState = {
	currentPreferences: null,
}

export const preferencesSlice = createSlice({
	name: 'preferences',
	initialState,
	reducers: {
		setPreferences: (
			state,
			action: PayloadAction<{
				security: Security
				user: UserPreferences
			}>
		) => {
			state.currentPreferences = action.payload
		},
		setSecurityPreferences: (state, action: PayloadAction<Security>) => {
			state.currentPreferences!.security = action.payload
		},
		setUserPreferences: (state, action: PayloadAction<UserPreferences>) => {
			state.currentPreferences!.user = action.payload
		},
	},
})

export const { setPreferences, setSecurityPreferences, setUserPreferences } =
	preferencesSlice.actions
export default preferencesSlice.reducer

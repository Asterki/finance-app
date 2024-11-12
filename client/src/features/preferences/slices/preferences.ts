import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserPreferences } from '../../../../../shared/models'

interface PreferencesState {
	currentPreferences: UserPreferences | null
}

const initialState: PreferencesState = {
	currentPreferences: null,
}

export const preferencesSlice = createSlice({
	name: 'preferences',
	initialState,
	reducers: {
		setPreferences: (state, action: PayloadAction<UserPreferences>) => {
			state.currentPreferences = action.payload
		},
	},
})

export const { setPreferences } = preferencesSlice.actions
export default preferencesSlice.reducer

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { setUser, setAuthStatus } from '../slices/auth'
import authApi from '../services/authApi'

const useAuth = () => {
	const dispatch = useDispatch()
	const user = useSelector((state: RootState) => state.auth.currentUser)
	const authStatus = useSelector((state: RootState) => state.auth.authStatus)

	// Sends a request to the server to register a new user
	const register = async (
		name: string,
		email: string,
		password: string,
		currency: string,
		language: string,
		timezone: string
	) => {
		dispatch(setAuthStatus('loading'))

		const result = await authApi.register(
			name,
			email,
			password,
			currency,
			language,
			timezone
		)
		if (result === 'success') {
			const currentUserStatus = await authApi.fetchUser()
			if (
				currentUserStatus.status == 'success' &&
				currentUserStatus.user
			) {
				dispatch(setUser(currentUserStatus.user))
				dispatch(setAuthStatus('authenticated'))
				return 'success'
			}
			return currentUserStatus.status
		} else {
			dispatch(setAuthStatus('unauthenticated'))
			return result
		}
	}

	// Sends a request to the server to log in a user
	const login = async (
		email: string,
		password: string,
		tfaCode: string = ''
	) => {
		dispatch(setAuthStatus('loading'))

		const result = await authApi.login(email, password, tfaCode)
		if (result.status === 'success') {
			// Set the user to the state
			const userResult = await authApi.fetchUser()
			dispatch(setUser(userResult.user!))
			dispatch(setAuthStatus('authenticated'))
			return {
				status: 'success',
			}
		} else {
			return result
		}
	}

	// Sends a request to the server to log out the current user
	const logout = async () => {
		const result = await authApi.logout()
		dispatch(setUser(null)) // Remove the user from the state
		dispatch(setAuthStatus('unauthenticated'))
		return result
	}

	// Checks if the user is authenticated on component mount
	const checkAuth = async () => {
		if (user) return
		const result = await authApi.fetchUser()
		if (result.user) {
			dispatch(setUser(result.user)) // Set the user to the state
			dispatch(setAuthStatus('authenticated'))
		} else {
			dispatch(setAuthStatus('unauthenticated'))
		}
	}

	useEffect(() => {
		checkAuth() // Check authentication status on component mount only if the user is not authenticated
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return { user, authStatus, login, logout, register }
}

export default useAuth

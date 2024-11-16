import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { useAuth, RegisterFormComponent } from '../../features/auth'
import useNotification from '../../hooks/useNotification'

import PageLayout from '../../layouts/PageLayout'

const AccountsRegisterPage = () => {
	const { notification, showNotification } = useNotification()
	const { user, authStatus, register } = useAuth()
	const redirect = useNavigate()

	const [registerLoading, setRegisterLoading] = React.useState(false)

	const onSubmitButtonClick = async (
		email: string,
		name: string,
		currency: string,
		password: string,
		repeatPassword: string
	) => {
		setRegisterLoading(true)

		const language = window.navigator.language.slice(0, 2) || 'en'
		const timezone =
			Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'

		// Validate the request body
		const registerSchema = z.object({
			email: z.string().email({
				message: 'Invalid email format',
			}),
			name: z
				.string()
				.min(3, {
					message: 'Name must be at least 3 characters long',
				})
				.max(100, {
					message: 'Name must be at most 100 characters long',
				}),
			password: z
				.string()
				.min(8, {
					message: 'Password must be at least 8 characters long',
				})
				.max(100, {
					message: 'Password must be at most 100 characters long',
				})
				.refine((data) => data === repeatPassword, {
					message: 'Passwords do not match',
				}),
			currency: z.string().length(3, {
				message: 'Currency must be exactly 3 characters long',
			}),
			language: z.string().length(2, {
				message: 'Language must be exactly 2 characters long',
			}),
			timezone: z
				.string()
				.min(3, {
					message: 'Timezone must be at least 3 characters long',
				})
				.max(100, {
					message: 'Timezone must be at most 100 characters long',
				}),
		})

		const validatedData = registerSchema.safeParse({
			email,
			name,
			password,
			currency,
			language,
			timezone,
		})

		if (!validatedData.success) {
			showNotification(
				'Error',
				validatedData.error.errors[0].message,
				'error'
			)
			setRegisterLoading(false)
		} else {
			const { email, name, currency, password, language, timezone } =
				validatedData.data
			const result = await register(
				name,
				email,
				password,
				currency,
				language,
				timezone
			)

			if (result == 'success') {
				redirect('/')
			} else {
				showNotification('Error', result, 'error')
				setRegisterLoading(false)
			}
		}
	}

	return (
		<PageLayout
			notification={notification}
			className="min-h-screen bg-[url('/img/bg.jpg')]"
		>
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center">
				<RegisterFormComponent
					user={user}
					authStatus={authStatus}
					onSubmit={onSubmitButtonClick}
					registerLoading={registerLoading}
				/>
			</div>
		</PageLayout>
	)
}

export default AccountsRegisterPage

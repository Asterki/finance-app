import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { useAuth, LoginFormComponent } from '../../features/auth'
import useNotification from '../../hooks/useNotification'

import PageLayout from '../../layouts/PageLayout'

const AccountsLoginPage = () => {
	const { notification, showNotification } = useNotification()
	const { user, authStatus, login } = useAuth()
	const redirect = useNavigate()

	const [loginLoading, setLoginLoading] = React.useState(false)

	const onSubmitButtonClick = async (
		email: string,
		password: string,
		tfaCode?: string
	) => {
		setLoginLoading(true)

		// Validate the request body
		const registerSchema = z.object({
			email: z.string().email({
				message: 'Invalid email format',
			}),
			password: z
				.string()
				.min(8, {
					message: 'Password must be at least 8 characters long',
				})
				.max(100, {
					message: 'Password must be at most 100 characters long',
				}),
			tfaCode: z.string().optional(),
		})

		const validatedData = registerSchema.safeParse({
			email,
			password,
			tfaCode,
		})

		if (!validatedData.success) {
			showNotification(
				'Error',
				validatedData.error.errors[0].message,
				'error'
			)
			setLoginLoading(false)
		} else {
			const { email, password, tfaCode } = validatedData.data
			const result = await login(email, password, tfaCode)

			if (result == 'success') {
				redirect('/')
			} else {
				showNotification('Error', result, 'error')
				setLoginLoading(false)
			}
		}
	}

	return (
		<PageLayout
			notification={notification}
			className="min-h-screen bg-[url('/img/bg.jpg')]"
		>
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center">
				<div className="w-4/12">
					<LoginFormComponent
						user={user}
						authStatus={authStatus}
						onSubmit={onSubmitButtonClick}
						loginLoading={loginLoading}
					/>
				</div>
			</div>
		</PageLayout>
	)
}

export default AccountsLoginPage

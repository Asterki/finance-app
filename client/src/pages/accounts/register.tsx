import * as React from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../features/auth'
import useNotification from '../../hooks/useNotification'

import PageLayout from '../../layouts/PageLayout'

const AccountsRegisterPage = () => {
	const { notification, showNotification } = useNotification()
	const { user, authStatus, register } = useAuth()
	const redirect = useNavigate()

	return (
		<PageLayout
			notification={notification}
			className="dark:bg-gray-800 bg-slate-200 min-h-screen dark:text-white text-slate-700 bg-gradient-to-bl from-blue-400 to-purple-400 dark:from-gray-500 dark:to-gray-700"
		>
			<h1 className='text-red-500'>jewoqjeqow</h1>
		</PageLayout>
	)
}

export default AccountsRegisterPage

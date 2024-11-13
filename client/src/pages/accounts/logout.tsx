import useNotification from '../../hooks/useNotification'
import { useAuth } from '../../features/auth'

import PageLayout from '../../layouts/PageLayout'

import LogoutComponent from '../../features/auth/components/LogoutComponent'

const AccountsLogoutPage = () => {
	const { user } = useAuth()
	const { notification } = useNotification()

	return (
		<PageLayout
			notification={notification}
			className={`min-h-screen bg-[url('/img/bg.jpg')] ${
				user && user.preferences.theme == 'dark' ? 'dark' : ''
			}`}
			requiresLogin={true}
		>
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center">
				<div className="w-4/12">
					<LogoutComponent />
				</div>
			</div>
		</PageLayout>
	)
}

export default AccountsLogoutPage

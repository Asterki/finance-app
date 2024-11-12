import useNotification from '../../hooks/useNotification'

import PageLayout from '../../layouts/PageLayout'

import LogoutComponent from '../../features/auth/components/LogoutComponent'

const AccountsLogoutPage = () => {
	const { notification } = useNotification()

	return (
		<PageLayout
			notification={notification}
			className="min-h-screen bg-[url('/img/bg.jpg')]"
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

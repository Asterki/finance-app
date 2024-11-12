import useNotification from '../../hooks/useNotification'
import { useAuth } from '../../features/auth'

import PageLayout from '../../layouts/PageLayout'

const LandingPage = () => {
	const { notification } = useNotification()
	const { user, authStatus } = useAuth()

	return (
		<PageLayout
			requiresLogin={true}
			notification={notification}
			className="dark:bg-neutral-600 dark:text-neutral-100"
		>
			<section className="min-h-screen flex">
				<div className="md:w-1/2 w-full flex flex-col items-center justify-center bg-black/20 backdrop-blur-md p-4">
					<h1 className="text-2xl">
						Good{' '}
						{new Date().getHours() < 12 ? 'morning' : 'afternoon'},{' '}
						{authStatus == 'authenticated' ? user?.name : 'Guest'}
					</h1>
				</div>
			</section>
		</PageLayout>
	)
}

export default LandingPage

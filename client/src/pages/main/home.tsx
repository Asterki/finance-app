import * as React from 'react'

import useNotification from '../../hooks/useNotification'

import { useAuth } from '../../features/auth'
import { useTransactions } from '../../features/transactions'
import { usePreferences } from '../../features/preferences'

import PageLayout from '../../layouts/PageLayout'

const LandingPage = () => {
	const { notification } = useNotification()
	const { user, authStatus } = useAuth()
	const { currentTransactions, createTransaction, getBalance } =
		useTransactions()
	const { preferences } = usePreferences()

	const [currentBalance, setCurrentBalance] = React.useState<
		number | 'loading'
	>('loading')

	React.useEffect(() => {
		;(async () => {
			const balance = await getBalance()
			if (typeof balance === 'number') {
				setCurrentBalance(balance)
			}
		})()
	}, [])

	const random = async () => {
		createTransaction({
			amount: Math.random() * 100,
			type: Math.random() > 0.5 ? 'income' : 'expense',
			description: 'Random Transaction',
			category: 'Random',
			date: new Date().toISOString(),
			tags: ['random'],
		})
	}

	return (
		<PageLayout
			requiresLogin={true}
			notification={notification}
			className={user && user.preferences.theme == 'dark' ? 'dark' : ''}
		>
			<section className="min-h-screen flex md:flex-row flex-col dark:bg-neutral-600 dark:text-neutral-100 text-neutral-700">
				<div className="md:w-1/2 w-full flex flex-col items-center justify-center bg-black/20 backdrop-blur-md p-4">
					<h2 className="text-2xl">
						Good{' '}
						{new Date().getHours() < 12 ? 'morning' : 'afternoon'},{' '}
						{authStatus == 'authenticated' ? user?.name : 'Guest'}
					</h2>

					<h1 className="text-5xl">
						{currentBalance == 'loading'
							? 'Loading...'
							: Math.round(currentBalance * 100) / 100}{' '}
						{preferences && preferences.user.currency}
					</h1>

					<button onClick={random}>Random</button>
				</div>

				<div>
					<h2>Transactions</h2>
					<ul>
						{currentTransactions && currentTransactions.map((transaction) => (
							<li key={transaction.id}>
								{transaction.amount} {transaction.type} -{' '}
								{transaction.description}
							</li>
						))}
					</ul>
				</div>
			</section>
		</PageLayout>
	)
}

export default LandingPage

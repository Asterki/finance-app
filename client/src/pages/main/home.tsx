import * as React from 'react'

import useNotification from '../../hooks/useNotification'

import { useAuth } from '../../features/auth'
import { useTransactions } from '../../features/transactions'
import { usePreferences } from '../../features/preferences'

import AddExpenseComponent from '../../features/transactions/components/AddExpenseComponent'
import AddIncomeComponent from '../../features/transactions/components/AddIncomeComponent'

import PageLayout from '../../layouts/PageLayout'
import { TransactionCardComponent } from '../../components/TransactionCard'

const LandingPage = () => {
	const { notification } = useNotification()
	const { user, authStatus } = useAuth()
	const { currentTransactions, getBalance } = useTransactions()
	const { preferences } = usePreferences()

	const [expenseDialogOpen, setExpenseDialogOpen] = React.useState(false)
	const [incomeDialogOpen, setIncomeDialogOpen] = React.useState(false)

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentTransactions])

	return (
		<PageLayout
			requiresLogin={true}
			notification={notification}
			className={user && user.preferences.theme == 'dark' ? 'dark' : ''}
		>
			<section className="min-h-screen flex md:flex-row flex-col dark:bg-neutral-600 dark:text-neutral-100 text-neutral-700">
				<div className="md:w-1/2 w-full flex flex-col items-center">
					<div className="flex flex-col gap-2 w-full p-4">
						<div className="rounded-sm shadow-md p-4 bg-blue-500 text-white dark:bg-neutral-700 w-full">
							<h2 className="text-2xl">
								Good{' '}
								{new Date().getHours() < 12
									? 'morning'
									: 'afternoon'}
								,{' '}
								{authStatus == 'authenticated'
									? user?.name
									: 'Guest'}
							</h2>

							<h1 className="text-5xl">
								{currentBalance == 'loading'
									? 'Loading...'
									: Math.round(currentBalance * 100) /
									  100}{' '}
								{preferences && preferences.user.currency}
							</h1>
						</div>

						<div className="flex items-stretch justify-stretch h-full gap-2 w-full">
							<button
								onClick={() => setExpenseDialogOpen(true)}
								className="bg-blue-500 rounded-sm text-white w-full p-2 transition-all hover:brightness-110 shadow-md"
							>
								Add Expense
							</button>
							<button
								onClick={() => setIncomeDialogOpen(true)}
								className="bg-blue-500 rounded-sm text-white w-full p-2 transition-all hover:brightness-110 shadow-md"
							>
								Add Income
							</button>
						</div>
					</div>

					<div className="w-full p-4">
						<h2 className="font-bold text-2xl">
							Recent Transactions
						</h2>
						<div className="flex gap-2 flex-col">
							{currentTransactions && preferences &&
								currentTransactions.map((transaction) => (
									<TransactionCardComponent
										type={transaction.type}
										amount={transaction.amount}
										category={transaction.category}
										date={transaction.date as string}
										description={transaction.description!}
										tags={transaction.tags}
										currency={preferences.user.currency}
									/>
								))}
						</div>
					</div>
				</div>

				<div className="md:w-1/2 w-full flex items-center justify-center">
					<img
						src="https://placehold.co/400"
						alt="Placeholder"
						className="rounded-md shadow-md"
					/>
				</div>

				<AddExpenseComponent
					open={expenseDialogOpen}
					onClose={() => {
						setExpenseDialogOpen(false)
					}}
				/>

				<AddIncomeComponent
					open={incomeDialogOpen}
					onClose={() => {
						setIncomeDialogOpen(false)
					}}
				/>
			</section>
		</PageLayout>
	)
}

export default LandingPage

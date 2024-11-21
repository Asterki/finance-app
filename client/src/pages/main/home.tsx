import * as React from 'react'

import useNotification from '../../hooks/useNotification'

import { useAuth } from '../../features/auth'
import {
	useTransactions,
	AddExpenseComponent,
	AddIncomeComponent,
	CurrentBalanceComponent,
	TransactionCardComponent,
	SeeTransactionComponent,
} from '../../features/transactions'
import { usePreferences } from '../../features/preferences'

import PageLayout from '../../layouts/PageLayout'
import { Transaction } from '../../../../shared/models'

const LandingPage = () => {
	const { notification } = useNotification()
	const { user } = useAuth()
	const { currentTransactions } = useTransactions()
	const { preferences } = usePreferences()

	const [expenseDialogOpen, setExpenseDialogOpen] = React.useState(false)
	const [incomeDialogOpen, setIncomeDialogOpen] = React.useState(false)

	const [seeTransactionState, setSeeTransactionState] = React.useState<{
		open: boolean
		transaction: Transaction | null
	}>({
		open: false,
		transaction: null,
	})

	return (
		<PageLayout
			requiresLogin={true}
			notification={notification}
			className={user && user.preferences.theme == 'dark' ? 'dark' : ''}
		>
			<section className="min-h-screen flex md:flex-row flex-col dark:bg-neutral-600 dark:text-neutral-100 text-neutral-700">
				<div className="md:w-1/2 w-full flex flex-col items-center">
					<div className="flex flex-col gap-2 w-full p-4">
						{user && preferences && (
							<CurrentBalanceComponent
								name={user.name}
								currency={preferences.user.currency}
							/>
						)}

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
							{currentTransactions &&
								preferences &&
								[...currentTransactions]
									.sort((a, b) => {
										return (
											new Date(b.date).getTime() -
											new Date(a.date).getTime()
										)
									})
									.map((transaction) => (
										<TransactionCardComponent
											type={transaction.type}
											amount={transaction.amount}
											category={transaction.category}
											date={
												transaction.date as unknown as string
											}
											description={
												transaction.description!
											}
											tags={transaction.tags}
											currency={preferences.user.currency}
											onClick={() => {
												setSeeTransactionState({
													open: true,
													transaction,
												})
											}}
										/>
									))}

							{currentTransactions &&
								currentTransactions.length == 0 && (
									<p className="text-center text-lg">
										No transactions to show.
									</p>
								)}
						</div>
					</div>
				</div>

				<div className="md:w-1/2 w-full flex items-center justify-center"></div>

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

				{seeTransactionState.transaction && (
					<SeeTransactionComponent
						open={seeTransactionState.open}
						transaction={seeTransactionState.transaction!}
						onClose={() => {
							setSeeTransactionState({
								open: false,
								transaction: null,
							})
						}}
					/>
				)}
			</section>
		</PageLayout>
	)
}

export default LandingPage

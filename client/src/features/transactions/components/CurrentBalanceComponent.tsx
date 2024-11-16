import React from 'react'

import useTransactions from '../hooks/useTransactions'

import { formatMoney } from '../../../utils/currency'

interface CurrentBalanceComponentProps {
	name: string
	currency: string
}

const CurrentBalanceComponent: React.FC<CurrentBalanceComponentProps> = ({
	currency,
	name,
}) => {
	const { currentTransactions, getBalance } = useTransactions()

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
		<div className="rounded-sm shadow-md p-4 bg-blue-500 text-white dark:bg-neutral-700 w-full">
			<h2 className="text-2xl">
				Good {new Date().getHours() < 12 ? 'morning' : 'afternoon'},{' '}
				{name}
			</h2>

			<h1 className="text-5xl">
				{currentBalance == 'loading'
					? 'Loading...'
					: formatMoney(currentBalance, currency)}
			</h1>
		</div>
	)
}

export default CurrentBalanceComponent

import React from 'react'
import { Transaction } from '../../../../../shared/models'
import { formatMoney } from '../../../utils/currency'
import { format } from 'date-fns'

interface SeeTransactionComponentProps {
	transaction: Transaction
	open: boolean
	onClose: () => void
}

const SeeTransactionComponent: React.FC<SeeTransactionComponentProps> = ({
	transaction,
	open,
	onClose,
}) => {
	return (
		<div
			className={`flex items-center justify-center absolute top-0 left-0 bg-black/20 backdrop-blur-sm min-h-screen w-full ${
				open ? '' : 'hidden'
			}`}
		>
			<div className="bg-white dark:bg-neutral-600 w-4/12 rounded-md shadow-md p-4">
				<div className="flex justify-between items-center mb-4">
					<h1 className="text-xl font-bold">{transaction.type}</h1>
					<button onClick={onClose} className="text-red-500">
						Close
					</button>
				</div>
				<p>
					<strong>Amount:</strong>{' '}
					{formatMoney(transaction.amount, '$')}
				</p>
				<p>
					<strong>Category:</strong> {transaction.category}
				</p>
				<p>
					<strong>Description:</strong>{' '}
					{transaction.description || 'N/A'}
				</p>
				<p>
					<strong>Date:</strong>{' '}
					{format(new Date(transaction.date), 'yyyy-MM-dd')}
				</p>
				<p>
					<strong>Tags:</strong>
					{transaction.tags.map((tag) => {
						return (
							<span
								key={tag}
								className="rounded-3xl border border-neutral-600 px-2 transition-all hover:brightness-110 bg-neutral-700"
							>
								#{tag}
							</span>
						)
					})}
				</p>

				<button
					type="button"
					onClick={() => {
						onClose()
					}}
					className="bg-red-500 rounded-sm text-white w-full p-2 transition-all hover:brightness-110 shadow-md"
				>
					Close
				</button>
			</div>
		</div>
	)
}

export default SeeTransactionComponent

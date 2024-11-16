import React from 'react'
import * as Select from '@radix-ui/react-select'

import { useTransactions } from '..'
import { FaCheck, FaChevronCircleDown } from 'react-icons/fa'

interface AddIncomeComponentProps {
	open: boolean
	onClose: () => void
}

const incomeCategories = [
	{
		value: 'salary',
		label: 'Salary',
	},
	{
		value: 'bonus',
		label: 'Bonus',
	},
	{
		value: 'interest',
		label: 'Interest',
	},
	{
		value: 'gift',
		label: 'Gift',
	},
	{
		value: 'freelance',
		label: 'Freelance',
	},
	{
		value: 'rental_income',
		label: 'Rental Income',
	},
	{
		value: 'dividends',
		label: 'Dividends',
	},
	{
		value: 'royalties',
		label: 'Royalties',
	},
	{
		value: 'investment_profits',
		label: 'Investment Profits',
	},
	{
		value: 'alimony',
		label: 'Alimony',
	},
	{
		value: 'child_support',
		label: 'Child Support',
	},
	{
		value: 'inheritance',
		label: 'Inheritance',
	},
	{
		value: 'refunds',
		label: 'Refunds',
	},
	{
		value: 'stipend',
		label: 'Stipend',
	},
	{
		value: 'scholarship',
		label: 'Scholarship',
	},
	{
		value: 'business_income',
		label: 'Business Income',
	},
	{
		value: 'grants',
		label: 'Grants',
	},
	{
		value: 'lottery_winnings',
		label: 'Lottery Winnings',
	},
	{
		value: 'cashback',
		label: 'Cashback',
	},
	{
		value: 'other',
		label: 'Other',
	},
]

const AddIncomeComponent: React.FC<AddIncomeComponentProps> = (props) => {
	const { createTransaction } = useTransactions()

	const [selectedCategory, setSelectedCategory] = React.useState('salary')

	const descriptionRef = React.useRef<HTMLInputElement>(null)
	const amountRef = React.useRef<HTMLInputElement>(null)
	const dateRef = React.useRef<HTMLInputElement>(null)
	const tagsRef = React.useRef<HTMLInputElement>(null)

	const submitIncome = async () => {
		const description = descriptionRef.current?.value
		const amount = amountRef.current?.value
		const date = dateRef.current?.value
		const tags = tagsRef.current?.value

		console.log(description, amount, date, tags)

		if (!description || !amount || !date || !tags) {
			return
		}

		await createTransaction({
			amount: parseFloat(amount),
			type: 'income',
			description,
			category: selectedCategory,
			date,
			tags: tags.split(',').map((tag) => tag.trim()),
		})

		props.onClose()
	}

	return (
		<div
			className={`flex items-center justify-center absolute top-0 left-0 bg-black/20 backdrop-blur-sm min-h-screen w-full ${
				props.open ? '' : 'hidden'
			}`}
		>
			<div className="bg-white dark:bg-neutral-600 w-4/12 rounded-md shadow-md p-4">
				<h2 className="font-bold text-2xl">Add Income</h2>
				<form action="" className="flex flex-col gap-2">
					<input
						type="text"
						placeholder="Description"
						ref={descriptionRef}
						className="p-2 dark:bg-neutral-700 bg-neutral-200 rounded-sm w-full"
					/>
					<input
						type="number"
						placeholder="Amount"
						ref={amountRef}
						className="p-2 dark:bg-neutral-700 bg-neutral-200 rounded-sm w-full"
					/>
					<Select.Root
						onValueChange={(value) => {
							if (!value) return
							setSelectedCategory(value)
						}}
						defaultValue={selectedCategory}
						value={selectedCategory}
					>
						<Select.Trigger className="w-full dark:bg-neutral-700 bg-neutral-200 rounded-sm p-2 flex items-center justify-start gap-2">
							<FaChevronCircleDown />
							{
								incomeCategories.find(
									(category) =>
										category.value === selectedCategory
								)?.label
							}
						</Select.Trigger>
						<Select.Content className="dark:bg-neutral-700 bg-neutral-200 rounded-sm *:p-2 *:outline-none *:transition-all *:cursor-pointer *:dark:bg-neutral-700 *:bg-neutral-200">
							{incomeCategories.map(
								(category: {
									label: string
									value: string
								}) => (
									<Select.Item
										className="hover:brightness-110 flex gap-2 items-center"
										value={category.value}
									>
										<Select.ItemIndicator>
											<FaCheck />
										</Select.ItemIndicator>
										{category.label}
									</Select.Item>
								)
							)}
						</Select.Content>
					</Select.Root>
					<input
						type="date"
						placeholder="Date"
						ref={dateRef}
						className="p-2 dark:bg-neutral-700 bg-neutral-200 rounded-sm w-full"
					/>
					<input
						type="string"
						placeholder="Tags (separated by commas)"
						ref={tagsRef}
						className="p-2 dark:bg-neutral-700 bg-neutral-200 rounded-sm w-full"
					/>
					<button
						type="button"
						onClick={() => {
							submitIncome()
						}}
						className="bg-blue-500 rounded-sm text-white w-full p-2 transition-all hover:brightness-110 shadow-md"
					>
						Add Income
					</button>

					<button
						type="button"
						onClick={() => {
							props.onClose()
						}}
						className="bg-red-500 rounded-sm text-white w-full p-2 transition-all hover:brightness-110 shadow-md"
					>
						Cancel
					</button>
				</form>
			</div>
		</div>
	)
}

export default AddIncomeComponent

import React from 'react'
import * as Select from '@radix-ui/react-select'

import { useTransactions } from '../'
import { FaCheck, FaChevronCircleDown } from 'react-icons/fa'

interface AddExpenseComponentProps {
	open: boolean
	onClose: () => void
}

const expenseCategories = [
	{
		value: 'food',
		label: 'Food',
	},
	{
		value: 'transport',
		label: 'Transport',
	},
	{
		value: 'shopping',
		label: 'Shopping',
	},
	{
		value: 'rent',
		label: 'Rent',
	},
	{
		value: 'utilities',
		label: 'Utilities',
	},
	{
		value: 'entertainment',
		label: 'Entertainment',
	},
	{
		value: 'health',
		label: 'Health',
	},
	{
		value: 'education',
		label: 'Education',
	},
	{
		value: 'insurance',
		label: 'Insurance',
	},
	{
		value: 'subscriptions',
		label: 'Subscriptions',
	},
	{
		value: 'travel',
		label: 'Travel',
	},
	{
		value: 'charity',
		label: 'Charity',
	},
	{
		value: 'pets',
		label: 'Pets',
	},
	{
		value: 'personal_care',
		label: 'Personal Care',
	},
	{
		value: 'home_maintenance',
		label: 'Home Maintenance',
	},
	{
		value: 'childcare',
		label: 'Childcare',
	},
	{
		value: 'loan_repayment',
		label: 'Loan Repayment',
	},
	{
		value: 'gifts',
		label: 'Gifts',
	},
	{
		value: 'taxes',
		label: 'Taxes',
	},
	{
		value: 'savings',
		label: 'Savings',
	},
	{
		value: 'investments',
		label: 'Investments',
	},
	{
		value: 'other',
		label: 'Other',
	},
]

const AddExpenseComponent: React.FC<AddExpenseComponentProps> = (props) => {
	const { createTransaction } = useTransactions()

	const [selectedCategory, setSelectedCategory] = React.useState('food')

	const descriptionRef = React.useRef<HTMLInputElement>(null)
	const amountRef = React.useRef<HTMLInputElement>(null)
	const dateRef = React.useRef<HTMLInputElement>(null)
	const tagsRef = React.useRef<HTMLInputElement>(null)

	const submitExpense = async () => {
		const description = descriptionRef.current?.value
		const amount = amountRef.current?.value
		const date = dateRef.current?.value
		const tags = tagsRef.current?.value

		console.log(description, amount, date, tags)

		if (!description || !amount || !date) {
			return
		}

		const res = await createTransaction({
			amount: parseFloat(amount),
			type: 'expense',
			description,
			category: selectedCategory,
			date,
			tags: tags ? tags.split(',').map((tag) => tag.trim()) : [],
		})

		console.log(res)

		props.onClose()

		// Clear the form fields
		descriptionRef.current!.value = ''
		amountRef.current!.value = ''
		dateRef.current!.value = ''
		tagsRef.current!.value = ''
		setSelectedCategory("food")
	}

	return (
		<div
			className={`flex items-center justify-center absolute top-0 left-0 bg-black/20 backdrop-blur-sm min-h-screen w-full ${
				props.open ? '' : 'hidden'
			}`}
		>
			<div className="bg-white dark:bg-neutral-600 w-4/12 rounded-md shadow-md p-4">
				<h2 className="font-bold text-2xl">Add Expense</h2>
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
								expenseCategories.find(
									(category) =>
										category.value === selectedCategory
								)?.label
							}
						</Select.Trigger>
						<Select.Content className="dark:bg-neutral-700 bg-neutral-200 rounded-sm *:p-2 *:outline-none *:transition-all *:cursor-pointer *:dark:bg-neutral-700 *:bg-neutral-200">
							{expenseCategories.map(
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
						type="datetime-local"
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
							submitExpense()
						}}
						className="bg-blue-500 rounded-sm text-white w-full p-2 transition-all hover:brightness-110 shadow-md"
					>
						Add Expense
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

export default AddExpenseComponent

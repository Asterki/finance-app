import Logger from '../utils/logger'

import { User, Expense, Income, Transaction } from '@prisma/client'

import prismaSingleton from '../config/prisma'
const prisma = prismaSingleton.getClient()

class FinancialService {
	private static instance: FinancialService

	private constructor() {}

	public static getInstance(): FinancialService {
		if (!FinancialService.instance) {
			FinancialService.instance = new FinancialService()
		}
		return FinancialService.instance
	}

	// Transactions
	public async createTransaction(
		userID: string,
		type: 'expense' | 'income',
		amount: number,
		category: string,
		description: string,
		date: Date,
		tags: string[]
	) {
		try {
			const transaction = await prisma.transaction.create({
				data: {
					userId: userID,
					type: type,
					amount: amount,
					category: category,
					description: description,
					date: date,
					tags: tags,
				},
			})
			return transaction
		} catch (error) {
			Logger.error(error as string)
			return null
		}
	}
	public async deleteTransaction(transactionID: string) {
		try {
			const transaction = await prisma.transaction.delete({
				where: {
					id: transactionID,
				},
			})
			return transaction
		} catch (error) {
			Logger.error(error as string)
			return null
		}
	}
	public async getTransactions(userID: string, count?: number) {
		try {
			let transactions: Transaction[]
			if (count) {
				transactions = await prisma.transaction.findMany({
					where: {
						userId: userID,
					},
					take: count,
				})
			} else {
				transactions = await prisma.transaction.findMany({
					where: {
						userId: userID,
					},
				})
			}
			return transactions
		} catch (error) {
			Logger.error(error as string)
			return null
		}
	}
	public async getTransaction(transactionID: string) {
		try {
			const transaction = await prisma.transaction.findUnique({
				where: {
					id: transactionID,
				},
			})
			return transaction
		} catch (error) {
			Logger.error(error as string)
			return null
		}
	}
	public async updateTransaction(
		transactionID: string,
		userID: string,
		amount: number,
		category: string,
		description: string,
		date: Date,
		tags: string[]
	) {
		try {
			const transaction = await prisma.transaction.update({
				where: {
					id: transactionID,
				},
				data: {
					userId: userID,
					amount: amount,
					category: category,
					description: description,
					date: date,
					tags: tags,
				},
			})
			return transaction
		} catch (error) {
			Logger.error(error as string)
			return null
		}
	}

	// Expenses
	public async createExpense(
		userID: string,
		amount: number,
		category: string,
		description: string,
		date: Date,
		tags: string[]
	) {
		try {
			const expense = await prisma.expense.create({
				data: {
					userId: userID,
					amount: amount,
					category: category,
					description: description,
					date: date,
					tags: tags,
				},
			})
			return expense
		} catch (error) {
			Logger.error(error as string)
			return null
		}
	}
	public async deleteExpense(expenseID: string) {
		try {
			const expense = await prisma.expense.delete({
				where: {
					id: expenseID,
				},
			})
			return expense
		} catch (error) {
			Logger.error(error as string)
			return null
		}
	}
	public async getExpenses(userID: string, count?: number) {
		try {
			let expenses: Expense[]
			if (count) {
				expenses = await prisma.expense.findMany({
					where: {
						userId: userID,
					},
					take: count,
				})
			} else {
				expenses = await prisma.expense.findMany({
					where: {
						userId: userID,
					},
				})
			}
			return expenses
		} catch (error) {
			Logger.error(error as string)
			return null
		}
	}
	public async getExpenseByID(expenseID: string) {
		try {
			const expense = await prisma.expense.findUnique({
				where: {
					id: expenseID,
				},
			})
			return expense
		} catch (error) {
			Logger.error(error as string)
			return null
		}
	}
	public async updateExpense(
		expenseID: string,
		userID: string,
		amount: number,
		category: string,
		description: string,
		date: Date,
		tags: string[]
	) {
		try {
			const expense = await prisma.expense.update({
				where: {
					id: expenseID,
				},
				data: {
					userId: userID,
					amount: amount,
					category: category,
					description: description,
					date: date,
					tags: tags,
				},
			})
			return expense
		} catch (error) {
			Logger.error(error as string)
			return null
		}
	}
	public async getSpendingByCategory(userID: string, category: string) {
		try {
			const expenses = await prisma.expense.findMany({
				where: {
					userId: userID,
					category: category,
				},
			})
			let total = 0
			for (const expense of expenses) {
				total += expense.amount
			}
			return total
		} catch (error) {
			Logger.error(error as string)
			return null
		}
	}
	public async getSpendingByTag(userID: string, tag: string) {
		try {
			const expenses = await prisma.expense.findMany({
				where: {
					userId: userID,
					tags: {
						has: tag,
					},
				},
			})
			let total = 0
			for (const expense of expenses) {
				total += expense.amount
			}
			return total
		} catch (error) {
			Logger.error(error as string)
			return null
		}
	}

	// Incomes
	public async createIncome(
		userID: string,
		amount: number,
		source: string,
		date: Date,
		description: string
	) {
		try {
			const income = await prisma.income.create({
				data: {
					userId: userID,
					amount: amount,
					source: source,
					date: date,
					description: description,
				},
			})
			return income
		} catch (error) {
			Logger.error(error as string)
			return null
		}
	}
	public async deleteIncome(incomeID: string) {
		try {
			const income = await prisma.income.delete({
				where: {
					id: incomeID,
				},
			})
			return income
		} catch (error) {
			Logger.error(error as string)
			return null
		}
	}
	public async getIncomes(userID: string, count?: number) {
		try {
			let incomes: Income[]
			if (count) {
				incomes = await prisma.income.findMany({
					where: {
						userId: userID,
					},
					take: count,
				})
			} else {
				incomes = await prisma.income.findMany({
					where: {
						userId: userID,
					},
				})
			}
			return incomes
		} catch (error) {
			Logger.error(error as string)
			return null
		}
	}
	public async getIncomeByID(incomeID: string) {
		try {
			const income = await prisma.income.findUnique({
				where: {
					id: incomeID,
				},
			})
			return income
		} catch (error) {
			Logger.error(error as string)
			return null
		}
	}
	public async updateIncome(
		incomeID: string,
		userID: string,
		amount: number,
		source: string,
		date: Date,
		description: string
	) {
		try {
			const income = await prisma.income.update({
				where: {
					id: incomeID,
				},
				data: {
					userId: userID,
					amount: amount,
					source: source,
					date: date,
					description: description,
				},
			})
			return income
		} catch (error) {
			Logger.error(error as string)
			return null
		}
	}
	public async getIncomeBySource(userID: string, source: string) {
		try {
			const incomes = await prisma.income.findMany({
				where: {
					userId: userID,
					source: source,
				},
			})
			let total = 0
			for (const income of incomes) {
				total += income.amount
			}
			return total
		} catch (error) {
			Logger.error(error as string)
			return null
		}
	}

	// Financial functions
	public async getBalance(userID: string, dayCount?: number) {
		try {
			const where = dayCount
				? {
						date: {
							gte: new Date(
								new Date().getTime() -
									1000 * 60 * 60 * 24 * dayCount
							),
						},
				  }
				: {
						userID: userID,
				  }

			const expenses = await prisma.expense.findMany({
				where: where,
			})
			const incomes = await prisma.income.findMany({
				where: where,
			})
			let totalExpenses = 0
			let totalIncomes = 0
			for (const expense of expenses) {
				totalExpenses += expense.amount
			}
			for (const income of incomes) {
				totalIncomes += income.amount
			}
			return totalIncomes - totalExpenses
		} catch (error) {
			Logger.error(error as string)
			return null
		}
	}
	public async getNetWorth(userID: string) {
		try {
			const expenses = await prisma.expense.findMany({
				where: {
					userId: userID,
				},
			})
			const incomes = await prisma.income.findMany({
				where: {
					userId: userID,
				},
			})
			let totalExpenses = 0
			let totalIncomes = 0
			for (const expense of expenses) {
				totalExpenses += expense.amount
			}
			for (const income of incomes) {
				totalIncomes += income.amount
			}
			return totalIncomes - totalExpenses
		} catch (error) {
			Logger.error(error as string)
			return null
		}
	}
}

export default FinancialService.getInstance()

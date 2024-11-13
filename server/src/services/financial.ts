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
	public async getExpense(expenseID: string) {
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
	public async getIncome(incomeID: string) {
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
}

export default FinancialService.getInstance()

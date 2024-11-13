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
	public async getExpenses(
		userID: string,
		count?: number 
	) {
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
                    id: expenseID
                }
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
                    id: expenseID
                },
                data: {
                    userId: userID,
                    amount: amount,
                    category: category,
                    description: description,
                    date: date,
                    tags: tags
                }
            })
            return expense
        } catch (error) {
            Logger.error(error as string)
            return null
        }
    }

	// Incomes
	public async createIncome() {}
	public async deleteIncome() {}
	public async getIncomes() {}
	public async getIncome() {}
	public async updateIncome() {}
}

export default FinancialService.getInstance()

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
	public async createTransaction() {}
	public async deleteTransaction() {}
    public async getTransactions() {}
    public async getTransaction() {}
    public async updateTransaction() {}

    // Expenses
	public async createExpense() {}
	public async deleteExpense() {}
    public async getExpenses() {}
    public async getExpense() {}
    public async updateExpense() {}

    // Incomes
	public async createIncome() {}
	public async deleteIncome() {}
    public async getIncomes() {}
    public async getIncome() {}
    public async updateIncome() {}
}

export default FinancialService.getInstance()

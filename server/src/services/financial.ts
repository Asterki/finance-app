import Logger from '../utils/logger'

import { Transaction } from '@prisma/client'

import prismaSingleton from '../config/prisma'
const prisma = prismaSingleton.getClient()

// Services must not handle errors, since the controllers that call them are responsible for handling them.
class FinancialService {
	private static instance: FinancialService

	private constructor() {}

	public static getInstance(): FinancialService {
		if (!FinancialService.instance) {
			FinancialService.instance = new FinancialService()
		}
		return FinancialService.instance
	}

	public async createTransaction(
		userID: string,
		type: 'expense' | 'income',
		amount: number,
		category: string,
		description: string,
		date: Date,
		tags: string[]
	) {
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
	}
	public async deleteTransaction(transactionID: string) {
		const transaction = await prisma.transaction.delete({
			where: {
				id: transactionID,
			},
		})
		return transaction
	}
	public async getTransactions(
		userID: string,
		filter: {
			count?: number
			dayCount?: number
			type?: 'expense' | 'income'
			category?: string
		}
	) {
		let transactions: Transaction[]
		const where = {
			userId: userID,
		}

		if (filter.dayCount) {
			// @ts-ignore We're going to set the value here
			where['date'] = {
				gte: new Date(
					new Date().setDate(new Date().getDate() - filter.dayCount)
				),
			}
		}

		if (filter.type) {
			// @ts-ignore We're going to set the value here
			where['type'] = filter.type
		}

		if (filter.category) {
			// @ts-ignore We're going to set the value here
			where['category'] = filter.category
		}

		if (filter.count) {
			transactions = await prisma.transaction.findMany({
				where,
				take: filter.count,
			})
		} else {
			transactions = await prisma.transaction.findMany({
				where,
			})
		}
		return transactions
	}
	public async getTransaction(transactionID: string, userID: string) {
		const transaction = await prisma.transaction.findUnique({
			where: {
				id: transactionID,
				userId: userID,
			},
		})
		return transaction
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
	}
}

export default FinancialService.getInstance()

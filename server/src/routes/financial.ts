import express from 'express'
import { z } from 'zod'

// Middleware
import { ensureAuthenticated } from '../middleware/authMiddleware'
import { validateRequestBody } from '../middleware/validationMiddleware'
import errorHandler from '../middleware/errorHandler'

// Import handlers
import financialGetByID from '../controllers/financial/getByID'
import createTransaction from '../controllers/financial/createTransaction'
import deleteTransaction from '../controllers/financial/deleteTransaction'
import getTransactions from '../controllers/financial/getTransactions'

const router = express.Router()

// Get transaction by ID
const getTransactionByIDSchema = z.object({
	transactionId: z.string().min(1).max(100),
})
router.post(
	'/getTransaction',
	[validateRequestBody(getTransactionByIDSchema), ensureAuthenticated],
	financialGetByID,
	errorHandler
)

// Create transaction
const createTransactionSchema = z.object({
	date: z.date(),
	type: z.enum(['expense', 'income']),
	amount: z.number().positive(),
	category: z.string().min(1).max(100),
	description: z.string().min(1).max(100),
	tags: z.array(z.string().max(20).min(10)).max(10),
})
router.post(
	'/createTransaction',
	[validateRequestBody(createTransactionSchema), ensureAuthenticated],
	createTransaction,
	errorHandler
)

// Delete transaction
const deleteTransactionSchema = z.object({
	transactionID: z.string().min(1).max(100),
})
router.post(
	'/deleteTransaction',
	[validateRequestBody(deleteTransactionSchema), ensureAuthenticated],
	deleteTransaction,
	errorHandler
)

// Get transactions
const getTransactionsSchema = z.object({
	count: z.number().int().positive().optional(),
	dayCount: z.number().int().positive().optional(),
	type: z.enum(['expense', 'income']).optional(),
	category: z.string().min(1).max(100).optional(),
})
router.post(
	'/getTransactions',
	[validateRequestBody(getTransactionsSchema), ensureAuthenticated],
	getTransactions,
	errorHandler
)

export default router

import express from 'express'
import { z } from 'zod'

// Middleware
import { ensureAuthenticated } from '../middleware/authMiddleware'
import { validateRequestBody } from '../middleware/validationMiddleware'
import errorHandler from '../middleware/errorHandler'

// Import handlers
import financialGetByID from '../controllers/financial/getByID'

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

export default router

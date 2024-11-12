// FILE: accounts.ts

import express from 'express'
import { z } from 'zod'

// Middleware
import { ensureAuthenticated } from '../middleware/authMiddleware'
import { validateRequestBody } from '../middleware/validationMiddleware'
import errorHandler from '../middleware/errorHandler'

// Import handlers
import profileEnableTFA from '../controllers/profile/enableTFA'
import profileDisableTFA from '../controllers/profile/disableTFA'

const router = express.Router()

// Register account
const enableTFASchema = z.object({
	code: z.string().length(6),
	secret: z.string().max(100),
})
router.post(
	'/enableTFA',
	validateRequestBody(enableTFASchema),
	profileEnableTFA
)

// Login account
const disableTFASchema = z.object({
	password: z.string().min(6),
})
router.post(
	'/disableTFA',
	validateRequestBody(disableTFASchema),
	profileDisableTFA
)

export default router

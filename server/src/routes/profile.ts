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
import profileUpdate from '../controllers/profile/update'

const router = express.Router()

// Enable TFA
const enableTFASchema = z.object({
	code: z.string().length(6),
	secret: z.string().max(100),
})
router.post(
	'/enableTFA',
	validateRequestBody(enableTFASchema),
	profileEnableTFA
)

// Disable TFA
const disableTFASchema = z.object({
	password: z.string().min(6),
})
router.post(
	'/disableTFA',
	validateRequestBody(disableTFASchema),
	profileDisableTFA
)

// Update Profile
const updateProfileSchema = z.object({
	language: z.string().length(2),
	timezone: z.string().max(100),
	currency: z.string().length(3),
	theme: z.enum(['light', 'dark']),
})
router.post(
	'/update',
	ensureAuthenticated,
	validateRequestBody(updateProfileSchema),
	profileUpdate
)

export default router

// FILE: accounts.ts

import express from 'express'
import { z } from 'zod'

// Middleware
import { ensureAuthenticated } from '../middleware/authMiddleware'
import { validateRequestBody } from '../middleware/validationMiddleware'
import errorHandler from '../middleware/errorHandler'

// Import handlers
import preferencesEnableTFA from '../controllers/preferences/enableTFA'
import preferencesDisableTFA from '../controllers/preferences/disableTFA'
import preferencesUpdate from '../controllers/preferences/update'

const router = express.Router()

// Enable TFA
const enableTFASchema = z.object({
	code: z.string().length(6),
	secret: z.string().max(100),
})
router.post(
	'/enableTFA',
	validateRequestBody(enableTFASchema),
	preferencesEnableTFA
)

// Disable TFA
const disableTFASchema = z.object({
	password: z.string().min(6),
})
router.post(
	'/disableTFA',
	validateRequestBody(disableTFASchema),
	preferencesDisableTFA
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
	preferencesUpdate
)

export default router

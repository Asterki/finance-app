import express from 'express'
import { z } from 'zod'

// Middleware
import { ensureAuthenticated } from '../middleware/authMiddleware'
import { validateRequestBody } from '../middleware/validationMiddleware'
import errorHandler from '../middleware/errorHandler'

// Import handlers
import enableTFA from '../controllers/preferences/enableTFA'
import disableTFA from '../controllers/preferences/disableTFA'
import update from '../controllers/preferences/update'
import fetch from '../controllers/preferences/fetch'
import changePassword from '../controllers/preferences/changePassword'
import recoveryCode from '../controllers/preferences/generateRecoveryCode'
import resetPassword from '../controllers/preferences/resetPassword'
import generateTFASecret from '../controllers/preferences/generateTFASecret'

const router = express.Router()

// Enable TFA
const enableTFASchema = z.object({
	code: z.string().length(6),
	secret: z.string().max(100),
})
router.post(
	'/enableTFA',
	validateRequestBody(enableTFASchema),
	enableTFA,
	errorHandler
)

// Disable TFA
const disableTFASchema = z.object({
	password: z.string().min(6),
})
router.post(
	'/disableTFA',
	validateRequestBody(disableTFASchema),
	disableTFA,
	errorHandler
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
	update,
	errorHandler
)

// Fetch
router.get('/fetch', ensureAuthenticated, fetch, errorHandler)

// Change Password
const changePasswordSchema = z.object({
	oldPassword: z.string().min(6).max(256),
	newPassword: z.string().min(6).max(256),
})
router.post(
	'/changePassword',
	ensureAuthenticated,
	validateRequestBody(changePasswordSchema),
	changePassword,
	errorHandler
)

// Generate recovery code
const generateRecoveryCodeSchema = z.object({
	email: z.string().email(),
})
router.post(
	'/generateRecoveryCode',
	validateRequestBody(generateRecoveryCodeSchema),
	recoveryCode,
	errorHandler
)

// Reset password
const resetPasswordSchema = z.object({
	resetToken: z.string().min(10),
	newPassword: z.string().min(6).max(256),
})
router.post(
	'/resetPassword',
	validateRequestBody(resetPasswordSchema),
	resetPassword,
	errorHandler
)

// Generate TFA secret
router.get('/generateTFASecret', generateTFASecret, errorHandler)

export default router

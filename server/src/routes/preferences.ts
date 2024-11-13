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
import preferencesFetch from '../controllers/preferences/fetch'
import preferencesChangePassword from '../controllers/preferences/changePassword'
import generateRecoveryCode from '../controllers/preferences/generateRecoveryCode'
import resetPassword from '../controllers/preferences/resetPassword'

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

// Fetch
router.get('/fetch', ensureAuthenticated, preferencesFetch)

// Change Password
const changePasswordSchema = z.object({
	oldPassword: z.string().min(6).max(256),
	newPassword: z.string().min(6).max(256),
})
router.post(
	'/changePassword',
	ensureAuthenticated,
	validateRequestBody(changePasswordSchema),
	preferencesChangePassword
)

// Generate recovery code
const generateRecoveryCodeSchema = z.object({
	email: z.string().email(),
})
router.post(
	'/generateRecoveryCode',
	validateRequestBody(generateRecoveryCodeSchema),
	generateRecoveryCode
)

// Reset password
const resetPasswordSchema = z.object({
	resetToken: z.string().min(10),
	newPassword: z.string().min(6).max(256),
})
router.post(
	'/resetPassword',
	validateRequestBody(resetPasswordSchema),
	resetPassword
)

export default router

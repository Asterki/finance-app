// FILE: accounts.ts

import express from 'express'
import { z } from 'zod'

// Middleware
import { ensureAuthenticated } from '../middleware/authMiddleware'
import { validateRequestBody } from '../middleware/validationMiddleware'
import errorHandler from '../middleware/errorHandler'

// Import handlers
import accountsFetch from '../controllers/accounts/fetch'
import accountsRegister from '../controllers/accounts/register'
import accountsLogin from '../controllers/accounts/login'
import accountsLogout from '../controllers/accounts/logout'
import accountsDeleteAccount from '../controllers/accounts/deleteAccount'

const router = express.Router()

// Fetch account
router.get('/me', accountsFetch)

// Register account
const registerSchema = z.object({
	email: z.string().email(),
	name: z.string().min(3).max(100),
	password: z.string().min(8).max(100),
	currency: z.string().min(3).max(3),
	language: z.string().min(2).max(2),
	timezone: z.string().min(3).max(100),
})
router.post(
	'/register',
	validateRequestBody(registerSchema),
	accountsRegister,
	errorHandler
)

// Login account
const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8).max(100),
	tfaCode: z.string().optional(),
})
router.post(
	'/login',
	validateRequestBody(loginSchema),
	accountsLogin,
	errorHandler
)

// Logout account
router.post('/logout', ensureAuthenticated, accountsLogout, errorHandler)

// Delete account
const deleteAccountSchema = z.object({
	password: z.string().min(8).max(100),
	tfaCode: z.string().optional(),
})
router.delete(
	'/me',
	ensureAuthenticated,
	validateRequestBody(deleteAccountSchema),
	accountsDeleteAccount,
	errorHandler
)

export default router

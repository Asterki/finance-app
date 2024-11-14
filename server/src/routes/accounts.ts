// FILE: accounts.ts

import express from 'express'
import { z } from 'zod'

// Middleware
import { ensureAuthenticated } from '../middleware/authMiddleware'
import { validateRequestBody } from '../middleware/validationMiddleware'
import errorHandler from '../middleware/errorHandler'

// Import handlers
import fetch from '../controllers/accounts/fetch'
import register from '../controllers/accounts/register'
import login from '../controllers/accounts/login'
import logout from '../controllers/accounts/logout'
import deleteAccount from '../controllers/accounts/deleteAccount'

const router = express.Router()

// Fetch account
router.get('/me', fetch)

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
	register,
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
	login,
	errorHandler
)

// Logout account
router.post('/logout', ensureAuthenticated, logout, errorHandler)

// Delete account
const deleteAccountSchema = z.object({
	password: z.string().min(8).max(100),
	tfaCode: z.string().optional(),
})
router.delete(
	'/me',
	ensureAuthenticated,
	validateRequestBody(deleteAccountSchema),
	deleteAccount,
	errorHandler
)

export default router

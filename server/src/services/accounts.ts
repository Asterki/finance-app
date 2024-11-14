import bcrypt from 'bcrypt'
import speakeasy from 'speakeasy'

import Logger from '../utils/logger'

import { User } from '@prisma/client'

import prismaSingleton from '../config/prisma'
const prisma = prismaSingleton.getClient()

class AccountService {
	private static instance: AccountService

	private constructor() {}

	public static getInstance(): AccountService {
		if (!AccountService.instance) {
			AccountService.instance = new AccountService()
		}
		return AccountService.instance
	}

	public async registerUser(
		name: string,
		email: string,
		password: string,
		currency: string,
		language: string,
		timezone: string
	): Promise<
		| {
				status: 'user-exists'
		  }
		| {
				status: 'success'
				user: User
		  }
	> {
		const isTaken = await prisma.user.findFirst({
			where: {
				email,
			},
		})
		if (isTaken) return { status: 'user-exists' }

		// Create the user
		const user = await prisma.user.create({
			data: {
				email,
				passwordHash: bcrypt.hashSync(password, 10),
				name: name,
				preferences: {
					create: {
						currency,
						language,
						timezone,
					},
				},
				// So that we don't have to create this object again
				security: {
					create: {
						twoFactorEnabled: false,
					},
				},
			},
		})

		return {
			status: 'success',
			user: user as unknown as User,
		}
	}

	public async deleteUser(
		userID: string,
		password: string,
		tfaCode?: string
	): Promise<{
		status: 'invalid-password' | 'invalid-tfa' | 'success'
	}> {
		const user = await prisma.user.findFirst({
			where: {
				id: userID,
			},
			include: {
				preferences: true,
				security: true,
			},
		})
		if (!user)
			throw new Error(
				'User is trying to delete their account, from a deleted account, what the hell?'
			)

		// Check passwords and TFA CODE
		if (!bcrypt.compareSync(password, user.passwordHash))
			return { status: 'invalid-password' }

		if (user.security?.twoFactorEnabled) {
			if (
				tfaCode &&
				!speakeasy.totp.verify({
					secret: user.security.twoFactorSecret as string,
					encoding: 'base32',
					token: tfaCode,
				})
			)
				return { status: 'invalid-tfa' }
		}
		// Delete the user and their related documents
		await prisma.user.delete({
			where: {
				id: userID,
			},
			include: {
				security: true,
				preferences: true,
			},
		})
		return {
			status: 'success',
		}
	}

	public async authenticatePassword(userID: string, password: string) {
		const user = await prisma.user.findFirst({
			where: {
				id: userID,
			},
		})
		if (!user) return false

		if (!bcrypt.compareSync(password, user.passwordHash)) return false
		return true
	}
}

export default AccountService.getInstance()

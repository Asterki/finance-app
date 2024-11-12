import bcrypt from 'bcrypt'
import speakeasy from 'speakeasy'
import { v4 as uuidv4 } from 'uuid'

import Logger from '../utils/logger'

import type { User } from '../../../shared/models'

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
	) {
		try {
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
		} catch (error) {
			console.log(error)
			Logger.error((error as Error).message, true)
			return {
				status: 'internal-error',
			}
		}
	}

	public async generateRecoveryCode(email: string) {
		try {
			const user = await prisma.user.findFirst({
				where: {
					email,
				},
			})
			if (!user) return { status: 'user-not-found' }

			const resetToken = uuidv4()
			await prisma.security.update({
				where: {
					userId: user.id,
				},
				data: {
					resetToken,
				},
			})

			return {
				status: 'success',
				recoveryCode: resetToken,
			}
		} catch (error) {
			Logger.error((error as Error).message, true)
			return {
				status: 'internal-error',
			}
		}
	}

	public async deleteUser(
		userID: string,
		password: string,
		tfaCode?: string
	) {
		try {
			const user = await prisma.user.findFirst({
				where: {
					id: userID,
				},
				include: {
					preferences: true,
					security: true,
				},
			})
			if (!user) return { status: 'internal-error' }
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
		} catch (error) {
			Logger.error((error as Error).message, true)
			return {
				status: 'internal-error',
			}
		}
	}

	public async recoverPassword(
		userID: string,
		resetToken: string,
		newPassword: string
	) {
		try {
			const user = await prisma.user.findFirst({
				where: {
					id: userID,
				},
			})
			if (!user) return

			await prisma.security.update({
				where: {
					userId: user.id,
				},
				data: {
					resetToken: null,
				},
			})

			await prisma.user.update({
				where: {
					id: user.id,
				},
				data: {
					passwordHash: bcrypt.hashSync(newPassword, 10),
				},
			})

			return {
				status: 'success',
			}
		} catch (error) {
			Logger.error((error as Error).message, true)
			return {
				status: 'internal-error',
			}
		}
	}

	public async changePassword(
		userID: string,
		oldPassword: string,
		newPassword: string
	) {
		const user = await prisma.user.findFirst({
			where: {
				id: userID,
			},
		})
		if (!user) return

		if (!bcrypt.compareSync(oldPassword, user.passwordHash)) return

		await prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				passwordHash: bcrypt.hashSync(newPassword, 10),
			},
		})

		return {
			status: 'success',
		}
	}
}

export default AccountService.getInstance()

import speakeasy from 'speakeasy'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

import Logger from '../utils/logger'

import prismaSingleton from '../config/prisma'
import { User } from '@prisma/client'
const prisma = prismaSingleton.getClient()

class PreferencesService {
	private static instance: PreferencesService

	private constructor() {}

	public static getInstance(): PreferencesService {
		if (!PreferencesService.instance) {
			PreferencesService.instance = new PreferencesService()
		}
		return PreferencesService.instance
	}

	public async updateUserProfile(
		userID: string,
		profile: {
			theme: string
			currency: string
			timezone: string
			language: string
		}
	): Promise<{ status: 'success' | 'internal-error' }> {
		try {
			await prisma.user.update({
				where: {
					id: userID,
				},
				data: {
					preferences: {
						update: {
							theme: profile.theme,
							currency: profile.currency,
							timezone: profile.timezone,
							language: profile.language,
						},
					},
				},
			})

			return { status: 'success' }
		} catch (error) {
			Logger.error((error as Error).message, true)
			return {
				status: 'internal-error',
			}
		}
	}

	public async activateTwoFactorAuth(
		userID: string,
		secret: string,
		code: string
	): Promise<{ status: 'invalid-code' | 'success' | 'internal-error' }> {
		try {
			// Verify the token
			const verified = speakeasy.totp.verify({
				secret,
				encoding: 'base32',
				token: code,
			})

			if (!verified) {
				return { status: 'invalid-code' }
			}

			// Update the user's security settings
			await prisma.user.update({
				where: {
					id: userID,
				},
				data: {
					security: {
						update: {
							twoFactorEnabled: true,
							twoFactorSecret: secret,
						},
					},
				},
			})

			return { status: 'success' }
		} catch (error) {
			Logger.error((error as Error).message, true)
			return {
				status: 'internal-error',
			}
		}
	}

	public async disableTwoFactorAuth(
		userID: string
	): Promise<{ status: 'success' | 'internal-error' }> {
		try {
			await prisma.user.update({
				where: {
					id: userID,
				},
				data: {
					security: {
						update: {
							twoFactorEnabled: false,
							twoFactorSecret: null,
						},
					},
				},
			})

			return { status: 'success' }
		} catch (error) {
			Logger.error((error as Error).message, true)
			return {
				status: 'internal-error',
			}
		}
	}

	public async getPreferences(userID: string) {
		const user = await prisma.user.findUnique({
			where: {
				id: userID,
			},
			select: {
				preferences: true,
				security: true,
			},
		})

		if (!user || !user.security || !user.preferences) {
			return null
		}

		return {
			preferences: user.preferences,
			security: user.security,
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
	): Promise<{ status: 'success' | 'invalid-password' }> {
		const user = await prisma.user.findFirst({
			where: {
				id: userID,
			},
		})
		if (!user) return { status: 'invalid-password' } // Although this should never happen
		if (!bcrypt.compareSync(oldPassword, user.passwordHash))
			return { status: 'invalid-password' }

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

	public async generateRecoveryCode(email: string): Promise<{ status: 'user-not-found' | 'success' | 'internal-error', recoveryCode?: string, user?: User }> {
		try {
			const user = await prisma.user.findFirst({
				where: {
					email,
				},
				include: {
					preferences: true,
				}
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
				user: user,
			}
		} catch (error) {
			Logger.error((error as Error).message, true)
			return {
				status: 'internal-error',
			}
		}
	}
}

export default PreferencesService.getInstance()

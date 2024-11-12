import speakeasy from 'speakeasy'

import Logger from '../utils/logger'

import prismaSingleton from '../config/prisma'
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
			},
		})

		if (!user) {
			return null
		}

		return user.preferences
	}
}

export default PreferencesService.getInstance()

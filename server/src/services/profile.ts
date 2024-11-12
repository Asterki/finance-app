import speakeasy from 'speakeasy'

import Logger from '../utils/logger'

import prismaSingleton from '../config/prisma'
const prisma = prismaSingleton.getClient()

class ProfileService {
	private static instance: ProfileService

	private constructor() {}

	public static getInstance(): ProfileService {
		if (!ProfileService.instance) {
			ProfileService.instance = new ProfileService()
		}
		return ProfileService.instance
	}

	public async updateUserProfile(
		userID: string,
		profile: {
			theme: string
			currency: string
			timezone: string
			language: string
		}
	) {
		try {
			const user = await prisma.user.update({
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

			return { status: 'success', user }
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
}

export default ProfileService.getInstance()

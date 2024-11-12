import { Express } from 'express'
import passport from 'passport'
import passportLocal from 'passport-local'
import session from 'express-session'
import bcrypt from 'bcrypt'

import type { User } from '../../../shared/models'

import { PrismaClient } from '@prisma/client'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'

import prismaSingleton from '../config/prisma'
const prisma = prismaSingleton.getClient()

class SessionManager {
	authStrategies: { [key: string]: passportLocal.Strategy }
	private instance: SessionManager | null = null

	constructor() {
		this.authStrategies = {
			local: new passportLocal.Strategy(
				{
					usernameField: 'email',
					passwordField: 'password',
					passReqToCallback: true,
					session: false,
				},
				async (req: any, _email: string, _password: string, done) => {
					try {
						const user = await prisma.user.findFirst({
							where: {
								email: req.body.email,
							},
							include: {
								security: true,
							},
						})

						if (!user)
							return done(null, false, {
								message: 'invalid-credentials',
							})

						// Verify password
						if (
							!bcrypt.compareSync(
								req.body.password,
								user.passwordHash
							)
						)
							return done(null, false, {
								message: 'invalid-credentials',
							})

						return done(null, user)
					} catch (err: unknown) {
						console.log(err)
						return done(err)
					}
				}
			),
		}
		this.loadStrategies()
	}

	public getInstance() {
		if (!this.instance) this.instance = new SessionManager()
		return this.instance
	}

	public loadToServer(server: Express) {
		server.use(
			session({
				secret: process.env.SESSION_SECRET as string,
				resave: false,
				saveUninitialized: false,
				cookie: {
					secure: false,
					maxAge: 1000 * 60 * 60 * 24 * 7,
					sameSite:
						process.env.NODE_ENV === 'production' ? 'none' : 'lax',
					httpOnly: false,
					path: '/',
					domain:
						process.env.NODE_ENV === 'production'
							? process.env.DOMAIN
							: 'localhost',
				},
				store: new PrismaSessionStore(new PrismaClient(), {
					checkPeriod: 2 * 60 * 1000, // 2 minutes
					dbRecordIdIsSessionId: true,
				}),
			})
		)
		server.use(passport.initialize())
		server.use(passport.session())
	}

	private loadStrategies() {
		passport.serializeUser((user: any, done) => {
			done(null, user.id)
		})

		passport.deserializeUser(async (id, done) => {
			const user = await prisma.user.findUnique({
				where: { id: id as string },
				include: {
					preferences: true,
				},
			})
			done(null, user)
		})

		passport.use(this.authStrategies.local)
	}
}

export default SessionManager

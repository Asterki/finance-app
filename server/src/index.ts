import express, { Express } from 'express'
import { createServer } from 'http'
import path from 'path'

// Middleware
import cors from 'cors'
import cookie from 'cookie-parser'

// Services
import Router from './routes'
import SessionManager from './services/sessions'

import Logger from './utils/logger'

import 'dotenv/config'

import accounts from './services/accounts'

accounts.registerUser(
	'Fernando Rivera',
	'asterki.dev@proton.me',
	'password',
	'USD',
	'en',
	'America/New_York'
)

class Server {
	private static instance: Server | null = null

	// Server related
	app: Express = express()
	httpServer: ReturnType<typeof createServer> = createServer(this.app)
	sessionManager: SessionManager = new SessionManager().getInstance()
	port: number
	dev: boolean

	// Services
	router: Router = Router.prototype.getInstance()

	constructor(dev: boolean, port: number) {
		this.checkEnv()
		this.dev = dev
		this.port = port
	}

	public static getInstance() {
		if (!this.instance) this.instance = new Server(false, 3000)
		return this.instance
	}

	async startServer() {
		this.loadMiddlewares()
		this.sessionManager.loadToServer(this.app)
		this.router.registerRoutes(this.app)

		this.httpServer.listen(this.port, () => {
			Logger.info(`Server listening on port ${this.port}`)
		})
	}

	private checkEnv() {
		const requiredKeys = ['SESSION_SECRET']
		for (const key of requiredKeys) {
			if (!process.env[key]) {
				Logger.error(`Missing ${key} in .env file`)
				process.exit(1)
			}
		}
	}

	private loadMiddlewares() {
		this.app.use(express.json())
		this.app.use(cookie(process.env.SESSION_SECRET as string))

		if (!this.dev) {
			this.app.use(
				express.static(path.join(__dirname, '../../client/dist'))
			)
		} else {
			// TODO: Add CORS configuration
			this.app.use(
				cors({
					origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
					credentials: true,
					exposedHeaders: ['set-cookie'],
				})
			)
		}
	}
}

const dev = process.env.NODE_ENV !== 'production'
const server = new Server(dev, 3000)
server.startServer()

export default Server

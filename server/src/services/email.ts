import nodeMailer from 'nodemailer'
import fsExtra from 'fs-extra'
import path from 'path'

import Logger from '../utils/logger'

class MailerService {
	private static instance: MailerService
	private transporter: nodeMailer.Transporter

	private emailTemplates = {}

	private constructor() {
		this.transporter = nodeMailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: parseInt(process.env.EMAIL_PORT as string),
			secure: process.env.EMAIL_SECURE === 'true',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		})

		this.loadEmailTemplates()
	}

	private async loadEmailTemplates() {
		const templateDir = path.join(__dirname, '../emails')

		const languageFolders = await fsExtra.readdir(templateDir)
		for (const lang of languageFolders) {
			const langDir = path.join(templateDir, lang)

			// @ts-ignore We're creating the keys and not necessarily expect them to be there
			this.emailTemplates[lang] = {}

			const filesInLangFolder = await fsExtra.readdir(
				path.join(templateDir, lang)
			)
			for (const file of filesInLangFolder) {
				const templateName = file.split('.')[0]
				const templatePath = path.join(langDir, file)
				const templateContent = await fsExtra.readFile(
					templatePath,
					'utf-8'
				)

				// @ts-ignore We're creating the keys and not necessarily expect them to be there
				this.emailTemplates[lang][templateName] = templateContent
			}
		}

		Logger.info('Email templates loaded')
	}

	public static getInstance() {
		if (!this.instance) this.instance = new MailerService()
		return this.instance
	}

	public async sendMail(
		to: string,
		subject: string,
		html: string
	) {
		return this.transporter.sendMail({
			from: process.env.EMAIL_FROM,
			to,
			subject,
			html,
		})
	}

	public async getEmailHTMLTemplate(
		template: string,
		lang: string,
		data: {
			[key: string]: string
		}
	) {
		// @ts-ignore We're creating the keys and not necessarily expect them to be there
		let emailTemplate = this.emailTemplates[lang][template]

		if (!emailTemplate) {
			Logger.error(`Email template not found: ${template}`)
			return null
		}

		for (const key in data) {
			emailTemplate = emailTemplate.replace(`{{${key}}}`, data[key])
		}

		return emailTemplate
	}
}

export default MailerService.getInstance()

import Nodemailer, { Transporter } from 'nodemailer'
import { EmailConfig } from '@config/mailer.config'
import { Logger } from '@services'

class Mailer {
	transporter: Transporter

	constructor() {
		this.transporter = this.create()
	}

	create() {
		const { host, port, user, pass, secure } = EmailConfig
		try {
			const transporter = Nodemailer.createTransport({
				host,
				port,
				secure,
				auth: { user, pass }
			})
			return transporter
		} catch (error) {
			Logger.error(`创建邮箱传输器错误，请检查配置:${error}`, {
				context: 'Mailer'
			})
		}
	}
}

export const MailService = new Mailer()

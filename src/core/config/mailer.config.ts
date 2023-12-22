import { EMAIL } from './env.config'
const { HOST, PASS, PORT, USER } = EMAIL

export class MailerConfinguration {
	secure = false
	constructor(
		readonly host: string,
		readonly port: number,
		readonly user: string,
		readonly pass: string
	) {}
}

export const EmailConfig = new MailerConfinguration(HOST, PORT, USER, PASS)

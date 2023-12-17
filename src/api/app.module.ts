import { AppModule as Module } from '@classes'
import { IAppRoute } from '@interfaces'
import { Guard } from './middlewares'

import { UserRouter } from './modules/base/user/user.router'
import { DictRouter } from './modules/dict/info/dict.router'
import { DictTypeRouter } from './modules/dict/type/router'
import { LoginLogRouter } from './modules/loginLog/login-log.router'

import { AuthRouter } from './modules/auth/auth.router'

export class AppModule extends Module {
	auth = Guard.checkJwt
	routes(): IAppRoute[] {
		return [
			{ segment: '/v1/auth', provider: AuthRouter },
			{ segment: '/v1/users', auth: true, provider: UserRouter },
			{ segment: '/v1/dicts', auth: true, provider: DictRouter },
			{
				segment: '/v1/dictTypes',
				auth: true,
				provider: DictTypeRouter
			},
			{
				segment: '/v1/loginLogs',
				auth: true,
				provider: LoginLogRouter
			}
		]
	}

	async plug(): Promise<void> {}

	constructor() {
		super()
	}
}

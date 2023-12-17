import { AppModule as Module } from '@classes'
import { IAppRoute } from '@interfaces'
import { UserRouter } from './modules/base/user/user.router'
import { DictRouter } from './modules/dict/info/dict.router'
import { DictTypeRouter } from './modules/dict/type/router'
import { LoginLogRouter } from './modules/loginLog/login-log.router'

import { AuthRouter } from './modules/auth/auth.router'

export class AppModule extends Module {
	routes(): IAppRoute[] {
		return [
			{ segment: '/v1', provider: AuthRouter, version: 'v1' },
			{ segment: '/v1/users', auth: true, provider: UserRouter, version: 'v1' },
			{ segment: '/v1/dicts', auth: true, provider: DictRouter, version: 'v1' },
			{
				segment: '/v1/dictTypes',
				auth: true,
				provider: DictTypeRouter,
				version: 'v1'
			},
			{
				segment: '/v1/loginLogs',
				auth: true,
				provider: LoginLogRouter,
				version: 'v1'
			}
		]
	}

	async plug(): Promise<void> {}

	constructor() {
		super()
	}
}

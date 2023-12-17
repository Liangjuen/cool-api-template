import { AppModule as Module } from '@classes'
import { IAppRoute } from '@interfaces'
import { UserRouter } from './modules/base/user/user.router'
import { DictRouter } from './modules/dict/info/dict.router'
import { DictTypeRouter } from './modules/dict/type/router'

export class AppModule extends Module {
	routes(): IAppRoute[] {
		return [
			{ segment: '/v1/users', provider: UserRouter, version: 'v1' },
			{ segment: '/v1/dicts', provider: DictRouter, version: 'v1' },
			{ segment: '/v1/dictTypes', provider: DictTypeRouter, version: 'v1' }
		]
	}

	constructor() {
		super()
	}
}

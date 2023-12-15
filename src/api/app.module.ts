import { IAppRoute } from '@interfaces'
import { AppModule as Module } from '@classes'

import { UserRouter } from '@api/modules/user/user.router'

export class AppModule extends Module {
	routes: IAppRoute[] = [
		{ segment: '/v1/users', provider: UserRouter, version: '1.0.0' }
	]

	constructor() {
		super()
		this.mapRoute()
	}
}

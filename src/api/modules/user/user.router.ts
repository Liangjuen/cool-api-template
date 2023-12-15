import { RouteModule } from '@classes'
import { IRoute } from '@interfaces'
import { UserController } from './user.controller'

export class UserRouter extends RouteModule {
	service = 'User'
	name = '用户'

	routes: IRoute[] = [
		{
			segment: '/:id',
			middlewares: [UserController.get],
			method: 'get',
			action: 'Get',
			name: '单例查询'
		}
	]

	constructor() {
		super()
		this.mapRoute()
	}
}

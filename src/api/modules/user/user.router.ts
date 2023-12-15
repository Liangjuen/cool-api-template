import { RouteModule } from '@classes'
import { UserController } from './user.controller'

export class UserRouter extends RouteModule {
	constructor() {
		super()
	}

	routes = [
		this.router.get('/', UserController.list),
		this.router.get('/:id', UserController.get)
	]
}

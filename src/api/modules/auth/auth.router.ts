import { RouteModule } from '@classes'
import { IRoute } from '@core/interfaces'
import { AuthController } from './auth.controller'
import { RequestMethod } from '@enums'

export class AuthRouter extends RouteModule {
	routes(): IRoute[] {
		return [
			{
				segment: '/login',
				method: RequestMethod.Post,
				middlewares: [AuthController.login]
			},
			{
				segment: '/register',
				method: RequestMethod.Post,
				middlewares: [AuthController.register]
			},
			{
				segment: '/logout',
				method: RequestMethod.Post,
				middlewares: [AuthController.logout]
			}
		]
	}
}

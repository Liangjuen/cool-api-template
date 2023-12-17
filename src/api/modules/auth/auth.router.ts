import { RouteModule } from '@classes'
import { IRoute } from '@core/interfaces'
import { AuthController } from './auth.controller'
import { RequestMethod } from '@enums'
import { Guard } from '@api/middlewares'

export class AuthRouter extends RouteModule {
	importAuth() {
		return [Guard.checkJwt]
	}
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
				auth: true,
				middlewares: [AuthController.logout]
			}
		]
	}
}

import { RouteModule } from '@classes'
import { RequestMethod as METHOD } from '@enums'
import { IRoute } from '@interfaces'
import { UserController } from './user.controller'
import { Validator } from '@api/middlewares/validator'
import { get, list, create, update, remove } from './user.validation'
import { Guard } from '@api/middlewares/guard'

export class UserRouter extends RouteModule {
	routes(): IRoute[] {
		return [
			{
				segment: '/:id',
				middlewares: [Guard.checkJwt, Validator.check(get), UserController.get],
				method: METHOD.Get
			},
			{
				segment: '/',
				middlewares: [
					Guard.checkJwt,
					Validator.check(list),
					UserController.list
				],
				method: METHOD.Get
			},
			{
				segment: '/',
				middlewares: [
					Guard.checkJwt,
					Validator.check(create),
					UserController.create
				],
				method: METHOD.Get
			},
			{
				segment: '/:id',
				middlewares: [
					Guard.checkJwt,
					Validator.check(update),
					UserController.update
				],
				method: METHOD.Patch
			},
			{
				segment: '/:ids',
				middlewares: [
					Guard.checkJwt,
					Validator.check(remove),
					UserController.remove
				],
				method: METHOD.Delete
			}
		]
	}

	constructor() {
		super()
	}
}

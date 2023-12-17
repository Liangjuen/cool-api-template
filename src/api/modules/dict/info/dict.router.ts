import { RouteModule } from '@classes'
import { RequestMethod as METHOD } from '@enums'
import { IRoute } from '@interfaces'
import { DictController } from './dict.controller'
import { Validator } from '@api/middlewares/validator'
import { get, list, create, update, remove } from './dict.validation'
import { Guard } from '@api/middlewares/guard'

export class DictRouter extends RouteModule {
	routes(): IRoute[] {
		return [
			{
				segment: '/:id',
				middlewares: [Guard.checkJwt, Validator.check(get), DictController.get],
				method: METHOD.Get
			},
			{
				segment: '/',
				middlewares: [
					Guard.checkJwt,
					Validator.check(list),
					DictController.list
				],
				method: METHOD.Get
			},
			{
				segment: '/',
				middlewares: [
					Guard.checkJwt,
					Validator.check(create),
					DictController.create
				],
				method: METHOD.Post
			},
			{
				segment: '/:id',
				middlewares: [
					Guard.checkJwt,
					Validator.check(update),
					DictController.update
				],
				method: METHOD.Patch
			},
			{
				segment: '/:ids',
				middlewares: [
					Guard.checkJwt,
					Validator.check(remove),
					DictController.remove
				],
				method: METHOD.Delete
			}
		]
	}

	constructor() {
		super()
	}
}

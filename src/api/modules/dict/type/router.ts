import { RouteModule } from '@classes'
import { RequestMethod as METHOD } from '@enums'
import { IRoute } from '@interfaces'
import { DictTypeController } from './controller'
import { Validator } from '@api/middlewares/validator'
import { create, update, remove } from './validation'

export class DictTypeRouter extends RouteModule {
	routes(): IRoute[] {
		return [
			{
				segment: '/',
				middlewares: [DictTypeController.list],
				method: METHOD.Get
			},
			{
				segment: '/',
				middlewares: [Validator.check(create), DictTypeController.create],
				method: METHOD.Post
			},
			{
				segment: '/:id',
				middlewares: [Validator.check(update), DictTypeController.update],
				method: METHOD.Patch
			},
			{
				segment: '/:ids',
				middlewares: [Validator.check(remove), DictTypeController.remove],
				method: METHOD.Delete
			}
		]
	}

	constructor() {
		super()
	}
}

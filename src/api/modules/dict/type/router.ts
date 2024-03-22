import { RouteModule } from '@classes'
import { RequestMethod as METHOD } from '@enums'
import { IRoute } from '@interfaces'
import { DictTypeController } from './controller'
import { Validator, Guard } from '@api/middlewares'
import { create, update, remove } from './validation'
import { DictPermission } from '@shared/enums/permission.enum'

export class DictTypeRouter extends RouteModule {
	routes(): IRoute[] {
		return [
			{
				segment: '/',
				middlewares: [
					Guard.checkPermission(DictPermission.DictTypeList),
					DictTypeController.list
				],
				method: METHOD.Get
			},
			{
				segment: '/',
				middlewares: [
					Guard.checkPermission(DictPermission.DictTypeCreate),
					Validator.check(create),
					DictTypeController.create
				],
				method: METHOD.Post
			},
			{
				segment: '/:id',
				middlewares: [
					Guard.checkPermission(DictPermission.DictTypeUpdate),
					Validator.check(update),
					DictTypeController.update
				],
				method: METHOD.Put
			},
			{
				segment: '/:ids',
				middlewares: [
					Guard.checkPermission(DictPermission.DictTypeRemove),
					Validator.check(remove),
					DictTypeController.remove
				],
				method: METHOD.Delete
			}
		]
	}

	constructor() {
		super()
	}
}

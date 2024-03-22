import { RouteModule } from '@classes'
import { RequestMethod as METHOD } from '@enums'
import { IRoute } from '@interfaces'
import { DictController } from './dict.controller'
import { Validator, Guard } from '@api/middlewares'
import { get, list, create, update, remove } from './dict.validation'
import { DictPermission } from '@shared/enums/permission.enum'

export class DictRouter extends RouteModule {
	routes(): IRoute[] {
		return [
			{
				segment: '/:id',
				middlewares: [
					Guard.checkPermission(DictPermission.DictGet),
					Validator.check(get),
					DictController.get
				],
				method: METHOD.Get
			},
			{
				segment: '/',
				middlewares: [
					Guard.checkPermission(DictPermission.DictList),
					Validator.check(list),
					DictController.list
				],
				method: METHOD.Get
			},
			{
				segment: '/',
				middlewares: [
					Guard.checkPermission(DictPermission.DictCreate),
					Validator.check(create),
					DictController.create
				],
				method: METHOD.Post
			},
			{
				segment: '/:id',
				middlewares: [
					Guard.checkPermission(DictPermission.DictUpdate),
					Validator.check(update),
					DictController.update
				],
				method: METHOD.Put
			},
			{
				segment: '/:ids',
				middlewares: [
					Guard.checkPermission(DictPermission.DictRemove),
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

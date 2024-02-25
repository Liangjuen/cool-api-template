import { RouteModule } from '@classes'
import { RequestMethod as METHOD } from '@enums'
import { IRoute } from '@interfaces'
import { DictController } from './dict.controller'
import { Validator } from '@api/middlewares/validator'
import { get, list, create, update, remove } from './dict.validation'
import { Guard } from '@api/middlewares/guard'
import { BasePermission } from '@shared/enums/permission.enum'

export class DictRouter extends RouteModule {
	routes(): IRoute[] {
		return [
			{
				segment: '/:id',
				middlewares: [
					Guard.checkPermission(BasePermission.UserGet),
					Validator.check(get),
					DictController.get
				],
				method: METHOD.Get
			},
			{
				segment: '/',
				middlewares: [
					Guard.checkPermission(BasePermission.UserList),
					Validator.check(list),
					DictController.list
				],
				method: METHOD.Get
			},
			{
				segment: '/',
				middlewares: [
					Guard.checkPermission(BasePermission.UserCreate),
					Validator.check(create),
					DictController.create
				],
				method: METHOD.Post
			},
			{
				segment: '/:id',
				middlewares: [
					Guard.checkPermission(BasePermission.UserUpdate),
					Validator.check(update),
					DictController.update
				],
				method: METHOD.Put
			},
			{
				segment: '/:ids',
				middlewares: [
					Guard.checkPermission(BasePermission.UserRemove),
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

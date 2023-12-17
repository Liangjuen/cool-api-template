import { RouteModule } from '@classes'
import { RequestMethod as METHOD } from '@enums'
import { IRoute } from '@interfaces'
import { UserController } from './user.controller'
import { Validator } from '@api/middlewares/validator'
import { get, list, create, update, remove } from './user.validation'
import { BasePermission } from '@shared/enums/permission.enum'
import { Guard } from '@api/middlewares/guard'

export class UserRouter extends RouteModule {
	routes(): IRoute[] {
		return [
			{
				segment: '/:id',
				middlewares: [
					Guard.checkPermission(BasePermission.UserGet),
					Validator.check(get),
					UserController.get
				],
				method: METHOD.Get
			},
			{
				segment: '/',
				middlewares: [
					Guard.checkPermission(BasePermission.UserList),
					Validator.check(list),
					UserController.list
				],
				method: METHOD.Get
			},
			{
				segment: '/',
				middlewares: [
					Guard.checkPermission(BasePermission.UserCreate),
					Validator.check(create),
					UserController.create
				],
				method: METHOD.Post
			},
			{
				segment: '/:id',
				middlewares: [
					Guard.checkPermission(BasePermission.UserUpdate),
					Validator.check(update),
					UserController.update
				],
				method: METHOD.Patch
			},
			{
				segment: '/:ids',
				middlewares: [
					Guard.checkPermission(BasePermission.UserRemove),
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

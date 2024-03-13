import { RouteModule } from '@classes'
import { RequestMethod as METHOD } from '@enums'
import { IRoute } from '@interfaces'
import { RoleController } from './role.controller'
import { Validator, Guard } from '@api/middlewares'
import { get, list, create, update, remove } from './role.validation'
import { BasePermission } from '@shared/enums/permission.enum'

export class RoleRouter extends RouteModule {
	routes(): IRoute[] {
		return [
			{
				segment: '/:id',
				middlewares: [
					Guard.checkPermission(BasePermission.RoleGet),
					Validator.check(get),
					RoleController.get
				],
				method: METHOD.Get
			},
			{
				segment: '/',
				middlewares: [
					Guard.checkPermission(BasePermission.RoleList),
					Validator.check(list),
					RoleController.list
				],
				method: METHOD.Get
			},
			{
				segment: '/',
				middlewares: [
					Guard.checkPermission(BasePermission.RoleCreate),
					Validator.check(create),
					RoleController.create
				],
				method: METHOD.Post
			},
			{
				segment: '/:id',
				middlewares: [
					Guard.checkPermission(BasePermission.RoleUpdate),
					Validator.check(update),
					RoleController.update
				],
				method: METHOD.Put
			},
			{
				segment: '/:ids',
				middlewares: [
					Guard.checkPermission(BasePermission.RoleRemove),
					Validator.check(remove),
					RoleController.remove
				],
				method: METHOD.Delete
			}
		]
	}

	constructor() {
		super()
	}
}

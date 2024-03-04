import { RouteModule } from '@classes'
import { RequestMethod as METHOD } from '@enums'
import { IRoute } from '@core/interfaces'
import { DepartmentController } from './department.controller'
import { Validator } from '@api/middlewares/validator'
import { get, create, update, remove } from './department.validation'
import { Guard } from '@api/middlewares/guard'
import { BasePermission } from '@shared/enums/permission.enum'

export class DepartmentRouter extends RouteModule {
	routes(): IRoute[] {
		return [
			{
				segment: '/:id',
				middlewares: [
					Guard.checkPermission(BasePermission.DepartmentGet),
					Validator.check(get),
					DepartmentController.get
				],
				method: METHOD.Get
			},
			{
				segment: '/',
				middlewares: [
					Guard.checkPermission(BasePermission.DepartmentList),
					DepartmentController.list
				],
				method: METHOD.Get
			},
			{
				segment: '/',
				middlewares: [
					Guard.checkPermission(BasePermission.DepartmentCreate),
					Validator.check(create),
					DepartmentController.create
				],
				method: METHOD.Post
			},
			{
				segment: '/:id',
				middlewares: [
					Guard.checkPermission(BasePermission.DepartmentUpdate),
					Validator.check(update),
					DepartmentController.update
				],
				method: METHOD.Put
			},
			{
				segment: '/:ids',
				middlewares: [
					Guard.checkPermission(BasePermission.DepartmentRemove),
					Validator.check(remove),
					DepartmentController.remove
				],
				method: METHOD.Delete
			}
		]
	}
}

import { RouteModule } from '@classes'
import { IRoute } from '@core/interfaces'
import { RequestMethod } from '@enums'
import { LoginLogController } from './login-log.controller'
import { Validator, Guard } from '@api/middlewares'
import { list, remove } from './login-validation'
import { LogsPermission } from '@shared/enums/permission.enum'

export class LoginLogRouter extends RouteModule {
	routes(): IRoute[] {
		return [
			{
				method: RequestMethod.Get,
				segment: '/',
				middlewares: [
					Guard.checkPermission(LogsPermission.LoginList),
					Validator.check(list),
					LoginLogController.list
				]
			},
			{
				method: RequestMethod.Delete,
				segment: '/:ids',
				middlewares: [
					Guard.checkPermission(LogsPermission.LoginRemove),
					Validator.check(remove),
					LoginLogController.remove
				]
			},
			{
				method: RequestMethod.Delete,
				segment: '/',
				middlewares: [
					Guard.checkPermission(LogsPermission.LoginClear),
					LoginLogController.clear
				]
			}
		]
	}
	constructor() {
		super()
	}
}

import { RouteModule } from '@classes'
import { IRoute } from '@core/interfaces'
import { RequestMethod } from '@enums'
import { Guard } from '@api/middlewares/guard'
import { BasePermission } from '@shared/enums/permission.enum'
import { PermsController } from './perms.controller'

export class PermsRouter extends RouteModule {
	routes(): IRoute[] {
		return [
			{
				segment: '/',
				method: RequestMethod.Get,
				middlewares: [
					Guard.checkPermission(BasePermission.PermsList),
					PermsController.list
				]
			}
		]
	}
}

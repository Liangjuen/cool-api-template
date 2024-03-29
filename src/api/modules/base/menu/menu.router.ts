import { RouteModule } from '@classes'
import { IRoute } from '@core/interfaces'
import { RequestMethod } from '@enums'
import { MenuController } from './menus.controller'
import { Validator, Guard } from '@api/middlewares'
import { get, list, create, update, remove } from './menu.validation'
import { BasePermission } from '@shared/enums/permission.enum'

export class MenuRouter extends RouteModule {
	routes(): IRoute[] {
		return [
			{
				segment: '/:id',
				method: RequestMethod.Get,
				middlewares: [
					Guard.checkPermission(BasePermission.MenuGet),
					Validator.check(get),
					MenuController.get
				]
			},
			{
				segment: '/',
				method: RequestMethod.Get,
				middlewares: [
					Guard.checkPermission(BasePermission.MenuList),
					Validator.check(list),
					MenuController.list
				]
			},
			{
				segment: '/',
				method: RequestMethod.Post,
				middlewares: [
					Guard.checkPermission(BasePermission.MenuCreate),
					Validator.check(create),
					MenuController.create
				]
			},
			{
				segment: '/:id',
				method: RequestMethod.Put,
				middlewares: [
					Guard.checkPermission(BasePermission.MenuUpdate),
					Validator.check(update),
					MenuController.update
				]
			},
			{
				segment: '/:ids',
				method: RequestMethod.Delete,
				middlewares: [
					Guard.checkPermission(BasePermission.MenuRemove),
					Validator.check(remove),
					MenuController.remove
				]
			}
		]
	}
}

import { Request } from 'express'
import { Menu } from './menu.entity'
import { IRequestParams, IRequestQuery, IBaseEntity } from '@shared/interfaces'

export interface IMenuQuery extends IRequestQuery {
	name?: string
	status?: string
}

interface IMenuRequestBody extends Omit<Menu, keyof IBaseEntity | 'pid'> {
	pid?: string | null
}

export interface IMenuRequest
	extends Request<IRequestParams, any, IMenuRequestBody, IMenuQuery> {}

export enum MenuCache {
	off = 0,
	on
}

export enum MenuHidden {
	off = 0,
	on
}

export enum MenuType {
	directory = 1,
	view,
	permission
}

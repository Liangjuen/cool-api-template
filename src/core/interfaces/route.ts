/* eslint-disable @typescript-eslint/ban-types */
import { RequestHandler } from 'express'
import { RouteModule } from '@classes'

interface Provider extends Function {
	new (...args: any[]): RouteModule
}

export interface IAppRoute {
	segment: string
	provider: Provider
	version?: string | number
}

export interface IRoute {
	segment: string
	middlewares: RequestHandler[]
	method: 'get' | 'post' | 'put' | 'delete' | 'patch'
	action: string
	name: string
	validator?: any
	perm?: string
}

export interface IRouteModule {
	name: string
	service: string
	version?: string | number
}

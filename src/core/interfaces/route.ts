/* eslint-disable @typescript-eslint/ban-types */
import { RequestHandler } from 'express'
import { RouteModule } from '@classes'
import { RequestMethod } from '@enums'

interface Provider extends Function {
	new (...args: any[]): RouteModule
}

export interface IAppRoute {
	segment: string
	provider: Provider
	auth?: boolean
	version?: string | number
}

export interface IRoute {
	segment: string
	middlewares: RequestHandler[]
	method: RequestMethod
	auth?: boolean
}

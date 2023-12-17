import { Router } from 'express'
import { IAppRoute, IRoute } from '@interfaces'

/**
 * Router 基类
 */
export abstract class BaseRouter {
	/**
	 * @description 包装 Express.Router
	 */
	readonly router: Router = null
	constructor() {
		this.router = Router()
	}
}

/**
 *@description 主路由
 */
export abstract class AppModule extends BaseRouter {
	/**
	 * @description 路由集合
	 */
	abstract routes(): IAppRoute[]
	constructor() {
		super()
		this.routes().forEach(route => {
			const instance = new route.provider()
			this.router.use(route.segment, instance.router)
		})
	}
}

/**
 * @description 模块路由
 */
export abstract class RouteModule extends BaseRouter {
	/**
	 * @description 路由集合
	 */
	abstract routes(): IRoute[]
	constructor() {
		super()
		this.routes().forEach(route => {
			this.router[route.method](route.segment, ...route.middlewares)
		})
	}
}

import { Router, RequestHandler } from 'express'
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
	importAuth(): RequestHandler[] {
		return []
	}
	async plug(): Promise<void> {}
	constructor() {
		super()
		this.routes().forEach(route => {
			const instance = new route.provider()
			const middl = []
			if (route.auth) middl.push(...this.importAuth())
			this.router.use(route.segment, ...middl, instance.router)
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
	importAuth(): RequestHandler[] {
		return []
	}
	constructor() {
		super()
		this.routes().forEach(route => {
			const middl = []
			if (route.auth) middl.push(...this.importAuth())
			this.router[route.method](route.segment, ...middl, ...route.middlewares)
		})
	}
}

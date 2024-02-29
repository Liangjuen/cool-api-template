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
	/**
	 * @description 注入身份认证中间件
	 * @returns
	 */
	importAuth(): RequestHandler[] {
		return []
	}

	/**
	 * @description 应用实例化完成后要进行的操作
	 */
	async plug(): Promise<void> {}

	/**
	 * @description 自定义全局前置中间件
	 * @returns
	 */
	prevMiddles(): RequestHandler[] {
		return []
	}

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

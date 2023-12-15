import { Router, RequestHandler } from 'express'
import { IAppRoute, IRoute, IRouteModule } from '@interfaces'

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

	mapRoute(): void {}
}

/**
 *@description 主路由
 */
export abstract class AppModule extends BaseRouter {
	abstract routes: IAppRoute[]
	constructor() {
		super()
	}

	mapRoute(): Router {
		if (!this.routes || !this.routes.length) return this.router
		this.routes.forEach(route => {
			const instance = new route.provider()
			this.router.use(route.segment, instance.router)
		})
		return this.router
	}
}

/**
 * @description 模块路由
 */
export abstract class RouteModule extends BaseRouter implements IRouteModule {
	service: string
	name: string
	routes: IRoute[]
	public middlewares: RequestHandler[]
	constructor() {
		super()
	}

	mapRoute(): void {
		if (!this.routes || !this.routes.length) return
		this.routes.forEach(route => {
			this.router[route.method](route.segment, ...route.middlewares)
		})
	}
}

import { Router } from 'express'

/**
 * Router 基类
 */
export abstract class BaseRouter {
	/**
	 * @description 包装 Express.Router
	 */
	readonly router: Router = null
	lifeCycle: any[]
	constructor() {
		this.router = Router()
	}

	mapRoute(): void {}
}

interface IAppRoute {
	segment: string
	provider: any
}
interface IRoute {}

/**
 *@description 主路由
 */
export abstract class AppModule extends BaseRouter {
	routes: IAppRoute[]
	constructor() {
		super()
	}
	mapRoute(): void {
		this.routes.forEach(route => {
			this.router.use(route.segment)
		})
	}
}

/**
 * @description 模块路由
 */
export abstract class RouteModule extends BaseRouter {
	routes: IRoute[]
	constructor() {
		super()
	}
}

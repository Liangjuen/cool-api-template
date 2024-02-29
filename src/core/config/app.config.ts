import Express from 'express'
import Cors from 'cors'

import bodyParser from 'body-parser'
import Hpp from 'hpp'
import RateLimit from 'express-rate-limit'
import Helmet from 'helmet'

import { Logger as LogService } from '@services'

import Logger from '@middlewares/logger'
import Catch from '@middlewares/catch'
import Resolve from '@middlewares/resolve'
import Cache from '@middlewares/cache'

import { CoolAppConfig, AppProvider } from '@interfaces'
import { AppModule } from '@classes'

class ExpressConfiguration {
	/**
	 * @description Express 实例
	 */
	instance: Express.Application

	/**
	 * @description 配置
	 */
	options: CoolAppConfig

	/**
	 * @description 基础服务
	 */
	get baseService() {
		return [
			bodyParser.json(),
			bodyParser.urlencoded({ extended: true }),
			Hpp({ checkBody: false }),
			Helmet({
				crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
				crossOriginResourcePolicy: false
			})
		]
	}

	/**
	 * @description 可配置的服务
	 */
	get optionalService() {
		const middls = []
		if (this.options.log) middls.push(Logger.write)
		if (this.options.cache) middls.push(Cache.listen)
		return middls
	}

	/**
	 * @description 请求生命周期
	 *
	 * @step 跨域处理
	 * @step 请求解析
	 * @step 防止请求参数污染
	 * @step 安全防护
	 * @step 守卫
	 * @step 日志
	 * @step 请求处理 [接口前缀、接口速率限制, 缓存, 路由(业务处理), 解析器(请求缓存及数据返回)]
	 * @step 异常处理 [生成输入错误, 记录脏错误, 输出干净的HTTP友好错误, 输出干净404错误]
	 */
	get lifeCycleService() {
		return [
			...this.baseService,
			[
				`/${this.options.prefix}`,
				RateLimit(this.options.rate),
				...this.optionalService,
				this.module.router,
				Resolve.output
			],
			[Catch.factory, Catch.log, Catch.exit, Catch.notFound]
		]
	}

	constructor() {}

	/**
	 * @description 模块
	 */
	module: AppModule

	/**
	 * @description 创建应用实例
	 * @param appModule 模块
	 * @param options 配置
	 * @returns
	 */
	async setup<T extends AppProvider>(
		appModule: T,
		options: CoolAppConfig
	): Promise<Express.Application> {
		this.instance = Express()
		this.options = options
		this.module = new appModule()

		// 执行异步任务
		if (this.module.plug) await this.module.plug()

		// 挂载全局前置中间件
		const middles = this.module.prevMiddles()
		if (middles.length) this.instance.use(...this.module.prevMiddles())

		// 解决跨域(可配置)
		if (this.options.cors) this.instance.use(Cors())
		return this.instance
	}

	/**
	 * @description 像 Express app 可作用到 Express实例上
	 * @param args
	 * @returns
	 */
	use(...args: any) {
		this.instance.use(args)
		return this.instance
	}

	/**
	 * @description 启用生命周期服务
	 * @returns
	 */
	useLifeCycle() {
		if (!this.lifeCycleService) return
		this.lifeCycleService.forEach(item => {
			if (Array.isArray(item)) {
				this.instance.use(...item)
			} else {
				this.instance.use(item)
			}
		})
	}

	/**
	 * @description 开启监听
	 * @param port 端口
	 * @returns
	 */
	async listen(resetPort?: number | string) {
		// use 生命周期
		this.useLifeCycle()

		const port = resetPort ? resetPort : this.options.port

		this.instance.listen(port, () => {
			LogService.info(`服务器运行在: http://${this.options.domain}:${port}`, {
				context: 'Application'
			})
		})
	}
}

export const Application = new ExpressConfiguration()

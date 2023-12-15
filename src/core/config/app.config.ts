import Express from 'express'
import Cors from 'cors'
import { Logger } from '@services'

import { CoolAppConfig } from '@interfaces'
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
	async setup<T extends AppModule = AppModule>(
		appModule: any,
		options: CoolAppConfig
	): Promise<Express.Application> {
		this.instance = Express()
		this.options = options
		const module = new appModule() as T
		this.module = module
		if (this.options.cors) this.instance.use(Cors())
		return this.instance
	}

	use(...args: any) {
		this.instance.use(args)
		return this.instance
	}

	/**
	 * @description 开启监听
	 * @param port 端口
	 * @returns
	 */
	async listen(port?: number | string) {
		// use 生命周期
		this.module.lifeCycle.forEach(item => {
			if (Array.isArray(item)) {
				this.instance.use(...item)
			} else {
				this.instance.use(item)
			}
		})

		this.instance.listen(port ? port : this.options.port, () => {
			Logger.info(
				`服务器运行在: http://${this.options.domain}:${this.options.port}`,
				{ context: 'Application' }
			)
		})
	}
}

export const Application = new ExpressConfiguration()

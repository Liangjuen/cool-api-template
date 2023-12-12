import Express, { RequestHandler, Router } from 'express'
import bodyParser from 'body-parser'
import Hpp from 'hpp'
import Cors from 'cors'
import RateLimit from 'express-rate-limit'
import Helmet from 'helmet'

import Logger from '@middlewares/logger'
import Catch from '@middlewares/catch'

import { CoolAppOptions } from '@interfaces'

export class CoolAppConfiguration {
	/**
	 * @description Express 应用实例
	 */
	application: Express.Application

	/**
	 * @description 路由
	 */
	router: Router

	/**
	 * @description 系统配置项
	 */
	options: CoolAppOptions

	/**
	 * @description 跨域处理
	 */
	get cors() {
		return this.options.cors ? Cors() : []
	}

	/**
	 * @description 全局守卫
	 */
	get guard(): RequestHandler[] {
		return []
	}

	/**
	 *  请求处理生命周期
	 *
	 * - 速率限制
	 * - 内存缓存
	 * - 路由
	 * - 解析器
	 */
	get handler(): RequestHandler[] {
		const { rate } = this.options
		return [RateLimit(rate), this.router]
	}

	/* *
	 * 异常处理生命周期
	 *
	 * - 生成输入错误
	 * - 记录脏错误
	 * - 输出干净的HTTP友好错误
	 * - 输出干净404错误
	 */
	get catch() {
		return [Catch.factory, Catch.log, Catch.exit, Catch.notFound]
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
	 * @step 请求处理
	 * @step 异常处理
	 */
	get containerLifeCycle(): any[] {
		return [
			this.cors,
			bodyParser.json(),
			bodyParser.urlencoded({ extended: true }),
			Hpp({ checkBody: false }),
			Helmet({
				crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
				crossOriginResourcePolicy: false
			}),
			this.guard,
			Logger.write,
			this.handler,
			this.catch
		]
	}

	constructor(router: Router, options: CoolAppOptions) {
		this.application = Express()
		this.router = router
		this.options = options
	}

	plug() {
		this.containerLifeCycle.forEach(item => {
			this.application.use(item)
		})
	}
}

import bodyParser from 'body-parser'
import Hpp from 'hpp'
import RateLimit from 'express-rate-limit'
import Helmet from 'helmet'

import { configuration } from '@config'
import Logger from '@middlewares/logger'
import Catch from '@middlewares/catch'
import Resolve from '@middlewares/resolve'

import { CoolAppConfig, IAppRoute } from '@interfaces'
import { AppModule as Module } from '@classes'

import { UserRouter } from '@api/modules/user/user.router'

export class AppModule extends Module {
	readonly options: CoolAppConfig = configuration()

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
	lifeCycle = [
		bodyParser.json(),
		bodyParser.urlencoded({ extended: true }),
		Hpp({ checkBody: false }),
		Helmet({
			crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
			crossOriginResourcePolicy: false
		}),
		Logger.write,
		[
			`/${this.options.prefix}`,
			RateLimit(this.options.rate),
			this.router,
			Resolve.output
		],
		[Catch.factory, Catch.log, Catch.exit, Catch.notFound]
	]

	routes: IAppRoute[] = [
		{ segment: '/v1/users', provider: UserRouter, version: '1.0.0' }
	]

	constructor() {
		super()
		this.mapRoute()
	}
}

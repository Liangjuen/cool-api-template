import bodyParser from 'body-parser'
import Hpp from 'hpp'
import RateLimit from 'express-rate-limit'
import Helmet from 'helmet'

import { configuration } from '@config'
import Logger from '@middlewares/logger'
import Catch from '@middlewares/catch'

import { CoolAppConfig } from '@interfaces'

export class AppModule {
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
	 * @step 请求处理
	 * @step 异常处理
	 */
	get lifeCycle(): any[] {
		return [
			bodyParser.json(),
			bodyParser.urlencoded({ extended: true }),
			Hpp({ checkBody: false }),
			Helmet({
				crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
				crossOriginResourcePolicy: false
			}),
			Logger.write,
			[RateLimit(this.options.rate)],
			[Catch.factory, Catch.log, Catch.exit, Catch.notFound]
		]
	}
	readonly routes = [{ segment: '/auth/', provider: 'AuthRouter' }]
	constructor() {}
}

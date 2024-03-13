import { Request, Response, NextFunction } from 'express'
import { extract } from '@utils/client-request-parse'
import { Logger as LoggerService } from '@services/Logger'

class Logger {
	/**
	 * @description 记录请求
	 * @param req
	 * @param res
	 * @param next
	 */
	write(req: Request, res: Response, next: NextFunction) {
		try {
			const { ip, method, httpVersion, url } = extract(req)
			LoggerService.http(`[${ip} http(${httpVersion})]${url}`, {
				context: method
			})
			next()
		} catch (error) {
			next(new Error('日志错误', error))
		}
	}

	transport() {
		// 传输 ...
	}
}

export default new Logger()

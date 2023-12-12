import { Request, Response, NextFunction } from 'express'
import { extract } from '@utils/client-request-parse'
import { Logger as LoggerService } from '@services/Logger'

export default class Logger {
	/**
	 * @description 记录请求
	 * @param req
	 * @param res
	 * @param next
	 */
	static write(req: Request, res: Response, next: NextFunction) {
		try {
			const { ip, method, httpVersion, url } = extract(req)
			LoggerService.http(`[${method}][${ip} http(${httpVersion})]${url}`)
			next()
		} catch (error) {
			next(new Error('日志错误', error))
		}
	}

	static transport() {
		// 传输 ...
	}
}

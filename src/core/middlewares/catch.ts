/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExceptionFactory } from '@factory'
import { Request, Response } from 'express'

import { Logger } from '@services/Logger'
import { extract } from '@utils/client-request-parse'

import { IHTTPException, IRequest } from '@interfaces'
import { HttpResponseMessage as Msg } from '@constants'
import { HttpResponseStatusCode as HttpCode } from '@enums'

export default class Catch {
	private constructor() {}

	/**
	 * @description 加工错误
	 *
	 * @param err 错误对象
	 * @param req 从http.incomingMessage派生的快速请求对象
	 * @param res 表示响应对象
	 * @param next 回调
	 */
	static factory(
		err: Error,
		req: Request,
		res: Response,
		next: (e: IHTTPException, req: Request, res: Response) => void
	): void {
		next(ExceptionFactory.get(err), req, res)
	}

	/**
	 * @description 记录错误日志
	 *
	 * @param err 错误对象
	 * @param req Express 请求对象
	 * @param res Express 响应对象
	 * @param next 回调
	 */
	static log(
		err: IHTTPException,
		req: IRequest,
		res: Response,
		next: (e: IHTTPException, req: Request, res: Response) => void
	): void {
		const { user } = req as { user: { id: number } }
		const { method, ip, httpVersion, url } = extract(req)
		const msg = err.statusCode > 500 ? err.message : err.statusText
		if (err.statusCode >= 500) {
			Logger.error(
				`${ip} HTTP/${httpVersion} ${err.statusCode} ${method} ${url}-${msg} #${
					user ? user.id : 'unknown'
				}`,
				{ context: 'Catch' }
			)
			Logger.error(`Error Stack: ${err.stack ? '\n  ' + err.stack : ''}`, {
				context: 'Catch'
			})
		}
		next(err, req, res)
	}

	/**
	 * @description 显示最终用户的清理错误
	 *
	 * @param err 错误对象
	 * @param req 从http.incomingMessage派生的快速请求对象
	 * @param res 表示响应对象
	 */
	static exit(
		err: IHTTPException,
		req: Request,
		res: Response,
		next: (e: Error, req: Request, res: Response) => void
	): void {
		const { statusCode, statusText, errors, message } = err
		res.status(statusCode)
		res.json({
			statusCode,
			statusText,
			errors,
			message
		})
	}

	/**
	 * @description 未找到资源
	 *
	 * @param req Express 请求对象
	 * @param res Express 响应对象
	 */
	static notFound(req: Request, res: Response): void {
		res.status(HttpCode.NotFound)
		res.json({
			statusCode: HttpCode.NotFound,
			statusText: Msg[HttpCode.NotFound],
			errors: [Msg[HttpCode.NotFound]]
		})
	}
}

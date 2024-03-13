import { Request } from 'express'
import { IResponse } from '@interfaces'
import { HttpResponseStatusCode as HttpCode } from '@enums'
import { getStatusCode } from '@utils/http'
import { CacheService } from '@services'

class Resolve {
	/**
	 * @description 解析当前请求并获取输出(除开404错误)
	 * @param req Express Request 的派生对象
	 * @param res Express Response 的派生对象
	 * @param next 回调函数
	 * @returns
	 */
	async output(req: Request, res: IResponse, next: (e?: Error) => void) {
		const hasContent = typeof res.locals?.data !== 'undefined'
		const hasNullContent = res.locals.data === null
		const hasStatusCodeOnResponse = typeof res.statusCode !== 'undefined'
		const status = getStatusCode(req.method, hasContent && !hasNullContent)

		if (req.method === 'DELETE') {
			res.status(status)
			res.end()
			return
		}

		if (!hasContent) next()

		if (
			(hasContent && ['GET', 'POST', 'PUT', 'PATCH'].includes(req.method)) ||
			(hasStatusCodeOnResponse && res.statusCode !== HttpCode.NotFound)
		) {
			//  缓存当前请求
			if (CacheService.isCachable(req)) {
				// 仅缓存数组类型
				if (Array.isArray(res.locals.data)) {
					const cacheKey = CacheService.key(req)
					await CacheService.setList(cacheKey, res.locals.data)
					const others = {
						code: res.locals.code,
						msg: res.locals.msg
					}
					await CacheService.set(
						CacheService.metaKey(cacheKey),
						JSON.stringify(others)
					)
				}
			}
			res.status(status)
			res.json(res.locals)
		}
	}
}

export default new Resolve()

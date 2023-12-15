import { Cache as Mcache } from '@services'
import { MEMORY_CACHE } from '@config/env.config'
import { IResponse, IRequest } from '@interfaces'

const mcache = new Mcache({
	cachable: MEMORY_CACHE.IS_ACTIVE,
	duration: MEMORY_CACHE.DURATION
})

export default class Cache {
	/**
	 * @description 请求缓存中间件
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Middleware function
	 */
	static async listen(
		req: IRequest,
		res: IResponse,
		next: () => void
	): Promise<void> {
		if (!mcache.isCachable(req)) return next()
		const cacheKey = mcache.key(req)
		const cached = (await mcache.getList(cacheKey)) as Array<any>
		const others = (await mcache.get(mcache.metaKey(cacheKey))) as string
		if (cached.length > 0) {
			res.status(200)
			res.json({
				data: cached,
				...JSON.parse(others)
			})
			return
		}
		next()
	}
}

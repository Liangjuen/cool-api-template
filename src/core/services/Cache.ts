import { Request } from 'express'
import { Redis } from '@config'
import { RedisClientType } from 'redis'
import { MEMORY_CACHE } from '@config/env.config'
import { ServerException } from '@exceptions'

const { IS_ACTIVE, DURATION } = MEMORY_CACHE

export class Cache {
	/**
	 * @description 是否开启缓存
	 */
	cachable: boolean

	/**
	 * @description 缓存持续时间(毫秒)
	 */
	duration: number

	private readonly baseKey: string = 'cache'

	/**
	 * @description 缓存引擎
	 */
	get engine(): RedisClientType {
		return Redis.client
	}

	constructor(opt?: { cachable?: boolean; duration?: number }) {
		const { cachable = IS_ACTIVE, duration = DURATION } = opt
		this.cachable = !!cachable
		this.duration = duration
	}

	/**
	 * @description 缓存的key
	 * @param req Express Request
	 * @returns string
	 */
	key(req: Request) {
		let queryParams = ''
		if (req.query)
			queryParams = Object.keys(req.query)
				.sort()
				.map(key => req.query[key])
				.join('')
		return `${this.baseKey}${req.baseUrl}${req.path}?q=${queryParams}`
	}

	metaKey = (key: string) => key + 'meta'

	/**
	 * @description 判断是否开启缓存,只缓存 get 请求
	 */
	isCachable(req: Request): boolean {
		return this.cachable && req.method === 'GET'
	}

	/**
	 * @description 缓存 string 类型
	 * @param key 键
	 * @param value 值
	 * @param ttl 存活时间(time to live)
	 */
	async set(key: string, value: string, ttl?: number): Promise<void> {
		try {
			await this.engine.set(key, value)
			await this.engine.expire(key, ttl || this.duration)
		} catch (error) {
			throw new ServerException(error)
		}
	}

	/**
	 * @description 获取 string 类型值
	 * @param key
	 * @returns
	 */
	async get(key: string): Promise<string> {
		return await this.engine.get(key)
	}

	/**
	 * @description 设置 array 类型
	 * @param key 键
	 * @param value 值
	 * @param ttl 存活时间(time to live)
	 */
	async setList(key: string, value: any[], ttl?: number): Promise<void> {
		try {
			if (!value.length) return
			value = value.map(i => JSON.stringify(i))
			await this.engine.lPush(key, value)
			await this.engine.expire(key, ttl || this.duration)
		} catch (error) {
			throw new ServerException(error)
		}
	}

	/**
	 * @description 获取 array 类型值
	 * @param key
	 * @returns
	 */
	async getList(key: string): Promise<Array<any>> {
		const list = await this.engine.lRange(key, 0, -1)
		return list.map(i => JSON.parse(i))
	}

	/**
	 * @description 设置 object 类型
	 * @param key 键
	 * @param value 值
	 * @param ttl 存活时间(time to live)
	 */
	async setHash(key: string, obj: object, ttl?: number): Promise<void> {
		try {
			if (JSON.stringify(obj) == '{}') return
			const hash: any[] = Object.keys(obj).reduce((total, fieldKey) => {
				total.push(fieldKey, obj[fieldKey])
				return total
			}, [])
			await this.engine.hSet(key, hash)
			await this.engine.expire(key, ttl || this.duration)
		} catch (error) {
			throw new ServerException(error)
		}
	}

	/**
	 * @description 获取 string 类型值
	 * @param key
	 * @returns
	 */
	async getHash(key: string): Promise<object> {
		return await this.engine.hGetAll(key)
	}
}

const CacheService = new Cache({
	cachable: IS_ACTIVE,
	duration: DURATION
})

export { CacheService }

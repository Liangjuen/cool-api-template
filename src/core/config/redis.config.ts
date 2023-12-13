import { createClient, RedisClientType } from 'redis'
import { Logger } from '@services/Logger'
import { REDIS } from './env.config'

const { HOST, PORT, DB } = REDIS

export class RedisConfiguration {
	/**
	 * @description Redis 客户端
	 */
	client: RedisClientType

	constructor() {
		this.createClient()
	}

	/**
	 * @description 创建 Redis 客户端
	 */
	private async createClient() {
		this.client = createClient({
			// 这里使用的是默认配置，在生产环境不建议这样，设置 Redis访问控制列表 请查看 https://redis.io/docs/management/security/acl/
			username: 'default',
			password: 'secret',
			database: DB,
			socket: {
				host: HOST,
				port: PORT
			}
		})
		this.client.on('error', err => {
			Logger.error(`❌  Redis 客户端错误: ${err}`)

			process.exit(0)
		})
		return this
	}

	/**
	 * @description 客户端连接 redis
	 *
	 * @returns
	 */
	async connect(): Promise<RedisClientType> {
		try {
			const clientConnect = await this.client.connect()
			Logger.info('✔️  Redis 客户端连接成功!')
			return clientConnect
		} catch (error) {
			Logger.error(`❌  Redis 客户端连接错误: ${error}`)
		}
	}
}

const redisClient = new RedisConfiguration()

export { redisClient as Redis }

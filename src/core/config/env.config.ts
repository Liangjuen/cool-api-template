import { existsSync } from 'fs'

import { config as Dotenv } from 'dotenv'
import { ENVIRONMENT } from '@enums'
import {
	EnvAccessToken,
	EnvServer,
	EnvMemoryCache,
	EnvTypeorm,
	EnvLog,
	EnvRedis
} from '@types'

export class Environment {
	/**
	 * @description 当前环境
	 */
	environment: string = ENVIRONMENT.Development

	/**
	 * @description 错误集合
	 */
	errors: string[] = []

	/**
	 * @description 具有聚合数据的集群
	 */
	cluster!: Record<string, unknown>

	/**
	 * @description Env 变量
	 */
	variables!: Record<string, unknown>

	/**
	 * @description 注册的变量 key 的集合
	 */
	get keys(): string[] {
		return this.defaultKeys
	}

	/**
	 * @description 变量校验规则
	 */
	get rules(): Record<string, any> {
		return this.defaultRules
	}

	readonly defaultKeys = [
		'PROTOCOL',
		'DOMAIN',
		'PORT',
		'API_PREFIX',
		'AUTHORIZED',
		'MEMORY_CACHE',
		'MEMORY_CACHE_DURATION',
		'DB_HOST',
		'DB_PORT',
		'DB_USER',
		'DB_PASS',
		'TYPEORM_DB',
		'TYPEORM_SYNC',
		'TYPEORM_LOG',
		'TYPEORM_CACHE',
		'ACCESS_TOKEN_SECRET',
		'ACCESS_TOKEN_DURATION',
		'REDIS_HOST',
		'REDIS_PORT',
		'REDIS_DB',
		'REDIS_USER',
		'REDIS_PASS',
		'LOG_LEVEL',
		'LOG_DIR'
		// more ...
	]

	readonly defaultRules = {
		/**
		 * @description api 前缀
		 *
		 * @returns
		 */
		API_PREFIX: (value: string) => {
			const regex = /^[a-zA-Z]+$/
			if (!regex.test(value)) {
				this.errors.push('API_PREFIX错误值: 请填写由英文字母组成的 api 前缀')
			}
			if (value.length > 16) {
				this.errors.push('API_PREFIX错误值: 请填写一个长度小于16的 api 前缀')
			}
			return value || ''
		},

		/**
		 * @description 协议名
		 *
		 * @returns
		 */
		PROTOCOL: (value: string) => {
			if (!['http', 'https'].includes(value)) {
				this.errors.push('PROTOCOL错误值:请填写一个正确的协议')
				return 'http'
			}
			return value
		},

		/**
		 * @description 服务域名
		 *
		 * @returns
		 */
		DOMAIN: (value: string): string => {
			return value ? value.trim().toLowerCase() : 'localhost'
		},

		/**
		 * @description 服务端口
		 *
		 * @returns
		 */
		PORT: (value: string): number => {
			if (
				value &&
				(isNaN(parseInt(value, 10)) || parseInt(value, 10) > 65535)
			) {
				this.errors.push('PORT错误值:请填写一个有效的TCP端口号')
			}
			return parseInt(value, 10) || 8848
		},

		/**
		 * @description 允许跨域
		 *
		 * @default null
		 */
		AUTHORIZED: (value: string) => {
			const regex =
				/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}(:[0-9]{1,5})|\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
			if (!value) {
				this.errors.push(
					'AUTHORIZED 未找到:请将单个主机填写为字符串或多个主机以逗号分隔(例如: http://my-domain.com 或 http://my-domain-1.com,http://my-domain-2.com,…)'
				)
			}
			if (value && value.lastIndexOf(',') === -1 && !regex.test(value)) {
				this.errors.push(
					'AUTHORIZED 错误值:请将单个主机填写为字符串或多个主机以逗号分隔(例如: http://my-domain.com或http://my-domain-1.com,http://my-domain-2.com,…)'
				)
			}
			if (
				value &&
				value.lastIndexOf(',') !== -1 &&
				value.split(',').some(v => !regex.test(v))
			) {
				this.errors.push(
					'AUTHORIZED 错误值:请将单个主机填写为字符串或多个主机以逗号分隔(例如: http://my-domain.com或http://my-domain-1.com,http://my-domain-2.com,…)'
				)
			}
			return value ? value.trim().toLowerCase() : null
		},

		/**
		 * @description token 秘钥设置
		 *
		 * @returns
		 */
		ACCESS_TOKEN_SECRET: (value: string) => {
			if (!value) {
				this.errors.push(
					'ACCESS_TOKEN_SECRET未找到: 请在.env文件中填写访问令牌秘密值以加强加密'
				)
			}
			if (value && value.toString().length < 16) {
				this.errors.push(
					'ACCESS_TOKEN_SECRET错误值:请填写一个长度大于16的 token 秘钥'
				)
			}
			return value ? value.toString() : null
		},

		/**
		 * @description token 有效时长设置
		 *
		 * @returns
		 */
		ACCESS_TOKEN_DURATION: (value: string): number => {
			if (value && isNaN(parseInt(value, 10))) {
				this.errors.push(
					'ACCESS_TOKEN_DURATION错误值:请填写一个数字形式的持续时间'
				)
			}
			return parseInt(value, 10) || 60
		},

		/**
		 * @description 开启接口缓存
		 *
		 * @default false
		 */
		MEMORY_CACHE: (value: string): boolean => {
			return !!parseInt(value, 10) || false
		},

		/**
		 * @description 缓存持续时间(毫秒)
		 *
		 * @default 5000
		 */
		MEMORY_CACHE_DURATION: (value: string): number => {
			return parseInt(value, 10) || 5000
		},

		/**
		 * @description 数据库域名
		 *
		 * @default default
		 */
		DB_HOST: (value: string): string => {
			return value || 'localhost'
		},

		/**
		 * @description 数据库端口
		 *
		 * @default 3306
		 */
		DB_PORT: (value: string): number => {
			if (!value) {
				this.errors.push('DB_PORT未找到: 请定义数据库服务器端口')
			}
			return parseInt(value, 10) || 3306
		},

		/**
		 * @description 数据库root用户名
		 *
		 * @default null
		 */
		DB_USER: (value: string): string => {
			if (!value) {
				this.errors.push('DB_USER未定: 请为您的数据库定义一个用户')
			}
			return value || ''
		},

		/**
		 * @description 数据库密码
		 *
		 * @default null
		 */
		DB_PASS: (value: string): string => {
			if (
				!value &&
				![ENVIRONMENT.Test, ENVIRONMENT.Development].includes(
					this.environment as ENVIRONMENT
				)
			) {
				this.errors.push('DB_PASS未定义: 请为您的数据库定义一个密码')
			}
			return value || ''
		},

		/**
		 * @description Typeorm 使用的数据库名
		 *
		 * @default null
		 */
		TYPEORM_DB: (value: string): string => {
			if (!value) {
				this.errors.push('TYPEORM_DB未找到:请定义目标数据库')
			}
			if (value && !/^[0-9a-zA-Z_]{3,}$/.test(value)) {
				this.errors.push('TYPEORM_DB错误值:请根据[0-9a-zA-Z_]检查数据库名称')
			}
			return value || ''
		},

		/**
		 * @description Typeorm 是否开启日志
		 *
		 * @default false
		 */
		TYPEORM_LOG: (value: string): boolean => {
			return !!parseInt(value, 10) || false
		},

		/**
		 * @description Typeorm 是否开启缓存
		 *
		 * @default false
		 */
		TYPEORM_CACHE: (value: string): boolean => {
			if (value && isNaN(parseInt(value, 10))) {
				this.errors.push('TYPEORM_CACHE坏值:请使用0或1来定义数据库缓存的激活')
			}
			return !!parseInt(value, 10) || false
		},

		/**
		 * @description 指示是否应该在每次应用程序启动时自动创建数据库模式
		 *
		 * @default false
		 */
		TYPEORM_SYNC: (value: string): boolean => {
			return this.environment === ENVIRONMENT.Production
				? false
				: this.environment === ENVIRONMENT.Test
					? true
					: !!parseInt(value, 10) || false
		},

		/**
		 * @description Redis 服务主机
		 *
		 * @default default
		 */
		REDIS_HOST: (value: string): string => {
			return value || 'localhost'
		},

		/**
		 * @description Redis 数据库
		 *
		 * @param value
		 * @returns
		 */
		REDIS_DB: (value: string): number => {
			if (!value) {
				this.errors.push('REDIS_DB未找到: 请设置Redis启用数据库 0 - 15')
			}
			let redisDb = parseInt(value, 10) || 0
			if (redisDb < 0 || redisDb > 15) {
				this.errors.push(
					'REDIS_DB取值错误: 请设置Redis启用数据库 0 - 15,已启用默认 15'
				)
				redisDb = 15
			}
			return redisDb
		},

		/**
		 * @description Redis 服务端口
		 *
		 * @default 6379
		 */
		REDIS_PORT: (value: string): number => {
			if (!value) {
				this.errors.push('REDIS_PORT未找到: 请定义Redis服务端口')
			}
			return parseInt(value, 10) || 6379
		},

		/**
		 * @description redis 用户名
		 *
		 * @default null
		 */
		REDIS_USER: (value: string) => {
			if (!value) {
				this.errors.push('REDIS_USER未定: 请为您的 Redis 定义一个用户')
			}
			return value || null
		},

		/**
		 * @description redis 服务密码
		 *
		 * @default null
		 */
		REDIS_PASS: (value: string) => {
			if (
				!value &&
				![ENVIRONMENT.Test, ENVIRONMENT.Development].includes(
					this.environment as ENVIRONMENT
				)
			) {
				this.errors.push('REDIS_PASS未定义: 请为您的 Redis 服务定义一个密码')
			}
			return value || null
		},

		/**
		 * @description 日志等级
		 *
		 * @default http
		 */
		LOG_LEVEL: (value: string): string => {
			if (!value) {
				this.errors.push('LOG_LEVEL未定义:请定义winston日志等级')
			}
			if (
				![
					'error',
					'warn',
					'info',
					'http',
					'debug',
					'verbose',
					'silly'
				].includes(value)
			) {
				this.errors.push(
					`LOG_LEVEL错误值:定义一个['error','warn','info','http','debug','verbose','silly']中的日志等级`
				)
			}
			return value || 'http'
		},

		/**
		 * @description 日志路径根目录
		 *
		 */
		LOG_DIR: (value: string): string => {
			return value || 'logs'
		}

		// more ...
	}

	constructor() {}

	/**
	 * @description 判断当前环境是否有效
	 */
	isValid(): boolean {
		return this.errors.length === 0
	}

	/**
	 * @description 从 process.env 中提取变量
	 *
	 * @param args env 变量
	 */
	extracts(args: Record<string, unknown>): Environment {
		this.variables = this.keys.reduce((acc, current) => {
			acc[current] = args[current]
			return acc
		}, {})
		return this
	}

	/**
	 * @description 根据环境变量 NODE_ENV 加载 .env 配置文件
	 */
	loads(dir?: string): Environment {
		this.environment = process.env.NODE_ENV
			? process.env.NODE_ENV
			: ENVIRONMENT.Development
		const path = dir ? dir : `${process.cwd()}/env/.env.${this.environment}`

		// 判断路径是否合法
		if (!existsSync(path)) {
			this.exit(`没有找到环境文件 ${path}`)
		}
		Dotenv({ path })

		return this
	}

	/**
	 * @description 解析允许的环境变量，验证它并返回安全的当前值或默认值
	 */
	validates(): Environment {
		this.keys.forEach((key: string) => {
			this.variables[key] = this.rules[key](this.variables[key])
		})
		return this
	}

	/**
	 * @discription 聚合
	 *
	 * @returns
	 */
	aggregates(): Environment {
		this.cluster = {
			ACCESS_TOKEN: {
				SECRET: this.variables.ACCESS_TOKEN_SECRET,
				DURATION: this.variables.ACCESS_TOKEN_DURATION
			},
			MEMORY_CACHE: {
				IS_ACTIVE: this.variables.MEMORY_CACHE,
				DURATION: this.variables.MEMORY_CACHE_DURATION
			},
			SERVER: {
				PROTOCOL: this.variables.PROTOCOL,
				DOMAIN: this.variables.DOMAIN,
				PORT: this.variables.PORT
			},
			AUTHORIZED: this.variables.AUTHORIZED,
			ENV: this.environment,
			LOGS: {
				LEVEL: this.variables.LOG_LEVEL,
				DIR: this.variables.LOG_DIR
			},
			TYPEORM: {
				DB: this.variables.TYPEORM_DB,
				TYPE: 'mysql',
				HOST: this.variables.DB_HOST,
				PORT: this.variables.DB_PORT,
				PWD: this.variables.DB_PASS,
				USER: this.variables.DB_USER,
				SYNC: this.variables.TYPEORM_SYNC && !this.isProd(),
				LOG: this.variables.TYPEORM_LOG,
				CACHE: !this.variables.MEMORY_CACHE && this.variables.TYPEORM_CACHE,
				ENTITIES: '**/modules/*/entity'
			},
			URL: `${this.variables.PROTOCOL}://${this.variables.DOMAIN}:${this.variables.PORT}`,
			API_PREFIX: this.variables.API_PREFIX,
			REDIS: {
				HOST: this.variables.REDIS_HOST,
				PORT: this.variables.REDIS_PORT,
				DB: this.variables.REDIS_DB,
				USER: this.variables.REDIS_USER,
				PASS: this.variables.REDIS_PASS
			}
			// more ...
		}

		return this
	}

	// 判断当前环境:
	isDev(): boolean {
		return process.env.NODE_ENV === 'development'
	}

	isProd(): boolean {
		return process.env.NODE_ENV === 'production'
	}

	isTest(): boolean {
		return process.env.NODE_ENV === 'test'
	}

	/**
	 * @description 导出配置
	 * @returns
	 */
	exports() {
		return {
			ACCESS_TOKEN: this.cluster.ACCESS_TOKEN as EnvAccessToken,
			SERVER: this.cluster.SERVER as EnvServer,
			AUTHORIZED: this.cluster.AUTHORIZED as string,
			CDN: this.cluster.CDN as string,
			CONTENT_TYPE: this.cluster.CONTENT_TYPE as string,
			DOMAIN: this.cluster.DOMAINE as string,
			ENV: this.cluster.ENV as string,
			LOGS: this.cluster.LOGS as EnvLog,
			MEMORY_CACHE: this.cluster.MEMORY_CACHE as EnvMemoryCache,
			PORT: this.cluster.PORT as number,
			TYPEORM: this.cluster.TYPEORM as EnvTypeorm,
			URL: this.cluster.URL as string,
			API_PREFIX: this.cluster.API_PREFIX as string,
			REDIS: this.cluster.REDIS as EnvRedis,
			isDev: this.isDev,
			isProd: this.isProd,
			isTest: this.isTest
		}
	}

	/**
	 * @description 使用错误消息退出当前进程
	 * @param messages
	 */
	exit(messages: string | string[]): void {
		if (Array.isArray(messages)) {
			process.stdout.write('\n\x1b[41m[ERROR]\x1b[40m\n\n')
			process.stdout.write([''].concat(messages).join('\n'))
		} else {
			process.stdout.write(messages)
		}
		process.exit(0)
	}
}

const environment = new Environment()

environment.loads().extracts(process.env).validates().aggregates()

if (!environment.isValid()) environment.exit(environment.errors)

export const {
	ACCESS_TOKEN,
	SERVER,
	AUTHORIZED,
	CDN,
	CONTENT_TYPE,
	DOMAIN,
	ENV,
	LOGS,
	MEMORY_CACHE,
	PORT,
	TYPEORM,
	URL,
	API_PREFIX,
	REDIS,
	isDev,
	isProd,
	isTest
} = environment.exports()

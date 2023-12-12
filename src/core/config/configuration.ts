import { TYPEORM, API_PREFIX, DOMAIN } from './env.config'
import { CoolConfig } from '@interfaces'

const defaultConfig: CoolConfig = {
	// 解决跨域
	cors: true,

	// 访问频率
	rate: {
		windowMs: 15 * 60 * 1000, // 15分钟
		max: 1000, // 限制15分钟内最多只能访问1000次
		message: '此IP请求过多, 请一小时后再试'
	},

	// 接口缓存
	cache: true,

	// typeorm 数据库连接配置 可查阅: https://typeorm.biunav.com/zh/
	orm: {
		type: TYPEORM.TYPE as 'mysql',
		host: TYPEORM.HOST,
		port: TYPEORM.PORT,
		username: TYPEORM.USER,
		password: TYPEORM.PWD,
		database: TYPEORM.DB,
		entities: [TYPEORM.ENTITIES],
		subscribers: [TYPEORM.SUBSCRIBERS],
		synchronize: TYPEORM.SYNC,
		logging: TYPEORM.LOG,
		cache: TYPEORM.CACHE
	},

	// winston 日志
	log: true,

	// 接口前缀
	prefix: API_PREFIX,

	domain: DOMAIN
}

export const configuration = (opt?: CoolConfig): CoolConfig => {
	if (!opt) return defaultConfig
	return { ...defaultConfig, ...opt }
}

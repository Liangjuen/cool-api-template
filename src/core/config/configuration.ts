import { API_PREFIX, DOMAIN, PORT } from './env.config'
import { CoolAppConfig } from '@interfaces'

const defaultConfig: CoolAppConfig = {
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

	// winston 日志
	log: true,

	// 接口前缀
	prefix: API_PREFIX,

	domain: DOMAIN,

	port: PORT
}

export const configuration = (opt?: CoolAppConfig): CoolAppConfig => {
	if (!opt) return defaultConfig
	return { ...defaultConfig, ...opt }
}

/**
 * @description Express App 配置
 */
export interface CoolAppConfig {
	cors?: boolean
	rate?: {
		windowMs: number
		max: number
		message: string
	}
	cache?: boolean
	log?: boolean
	prefix?: string
	domain?: string
	port?: number
}

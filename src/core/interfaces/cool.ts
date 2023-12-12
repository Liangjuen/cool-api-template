import { DataSourceOptions } from 'typeorm'

/**
 * @description Express App 配置
 */
export interface CoolAppOptions {
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

/**
 * @description 系统配置
 */
export interface CoolConfig extends CoolAppOptions {
	orm?: DataSourceOptions
}

import { STOREDMODE } from '@enums'

/**
 * 文件存储配置
 */
export interface CoolFileConfig {
	mode: STOREDMODE
	qiniu: QINIUConfig
	local: LOCALConfig
}

/**
 * 存储引擎
 */
export interface CoolFileEngine {
	upload<T extends Record<string, unknown>>(ctx: T): Promise<unknown>
}

/**
 * 七牛
 */
export interface QINIUConfig {
	accessKey: string
	secretKey: string
	domain: string
	region: string
	bucket: string
	uploadUrl?: string
	fileKey?: string
}

/**
 * 本地
 */
export interface LOCALConfig {
	maxSize: number
	limit: number
	dir: string
}

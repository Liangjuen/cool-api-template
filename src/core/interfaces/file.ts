import { CLOUDTYPE } from '@enums'

/**
 * 文件存储配置
 */
export interface CoolFileConfig {
	cloud: CLOUDTYPE
	qiniu: QINIUConfig
}

/**
 * 存储引擎
 */
export interface CoolFileEngine {
	upload(ctx: any): Promise<unknown>
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

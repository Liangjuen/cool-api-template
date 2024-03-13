import { QINIU } from './env.config'
const { AK, SK, DOMAIN, BUCKET, UPLOAD_URL, REGION } = QINIU
import { CoolFileConfig } from '@interfaces'
import { CLOUDTYPE } from '@enums'

/**
 * 七牛云配置
 */
export class QiniuConfiguration {
	constructor(
		readonly accessKey: string,
		readonly secretKey: string,
		readonly domain: string,
		readonly region: string,
		readonly bucket: string,
		readonly uploadUrl?: string,
		readonly fileKey?: string
	) {}
}

// ...

export const coolFileConfig: CoolFileConfig = {
	cloud: CLOUDTYPE.QINIU,
	qiniu: new QiniuConfiguration(AK, SK, DOMAIN, REGION, BUCKET, UPLOAD_URL)
	// ...
}

import { QINIU } from './env.config'
const { AK, SK, DOMAIN, BUCKET, UPLOAD_URL, REGION } = QINIU
import { CoolFileConfig } from '@interfaces'
import { STOREDMODE } from '@enums'

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

export class LocalConfiguration {
	constructor(
		readonly dir: string,
		readonly maxSize: number,
		readonly limit: number
	) {}
}

export const coolFileConfig: CoolFileConfig = {
	mode: STOREDMODE.CLOUD,
	qiniu: new QiniuConfiguration(AK, SK, DOMAIN, REGION, BUCKET, UPLOAD_URL),
	local: new LocalConfiguration('public', 1024, 10)
}

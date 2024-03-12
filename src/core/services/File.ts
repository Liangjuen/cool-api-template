import QINIU from 'qiniu'
import { coolFileConfig } from '@config'
import { CoolFileEngine } from '@interfaces'
import { STOREDMODE, CLOUDTYPE } from '@enums'

/**
 * @description 七牛云
 */
class Qiniu implements CoolFileEngine {
	/**
	 * @description 上传
	 * @returns
	 */
	async upload() {
		const {
			bucket,
			domain,
			accessKey,
			secretKey,
			region,
			fileKey = 'file',
			uploadUrl = `https://upload-${region}.qiniup.com/`
		} = coolFileConfig.qiniu
		const mac = new QINIU.auth.digest.Mac(accessKey, secretKey)
		const putPolicy = new QINIU.rs.PutPolicy({
			scope: bucket
		})
		const uploadToken = putPolicy.uploadToken(mac)

		return {
			uploadUrl: region ? `https://upload-${region}.qiniup.com/` : uploadUrl,
			token: uploadToken,
			publicDomain: domain,
			fileKey
		}
	}
}

class Local implements CoolFileEngine {
	async upload<T extends Record<string, unknown>>(ctx: T) {
		console.log(ctx)
		return {
			url: ''
		}
	}
}

/**
 * @description 文件上传/删除/...
 */
class CoolFile {
	get config() {
		return coolFileConfig
	}
	/**
	 * @description 存储引擎
	 */
	get engine(): CoolFileEngine {
		const { mode, qiniu } = this.config
		if (mode == STOREDMODE.LOCAL) {
			return this.local
		} else if (mode == STOREDMODE.CLOUD) {
			if (qiniu) return this.qiniu
		} //...
		return this.qiniu
	}

	/**
	 * @description 七牛云
	 */
	qiniu = new Qiniu()

	/**
	 * @description 本地存储
	 */
	local = new Local()

	async upload(ctx?: any) {
		const { mode, qiniu } = this.config
		if (mode == STOREDMODE.LOCAL) {
			return await this.local.upload(ctx)
		}
		if (mode == STOREDMODE.CLOUD) {
			if (qiniu) {
				return await this.qiniu.upload()
			}
		}
	}

	/**
	 * @description 获取上传模式
	 * @returns
	 */
	async getMode() {
		const { mode, qiniu } = this.config
		if (mode == STOREDMODE.LOCAL) {
			return {
				mode: STOREDMODE.LOCAL,
				type: STOREDMODE.LOCAL
			}
		}
		if (qiniu) {
			return {
				mode: STOREDMODE.CLOUD,
				type: CLOUDTYPE.QINIU
			}
		}
	}
}

export const qiniu = new Qiniu()

export const coolFile = new CoolFile()

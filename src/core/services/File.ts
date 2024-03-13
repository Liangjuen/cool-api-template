import QINIU from 'qiniu'
import { coolFileConfig } from '@config'
import { CoolFileEngine } from '@interfaces'
import { CLOUDTYPE } from '@enums'

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
		return this.qiniu
	}

	/**
	 * @description 七牛云
	 */
	qiniu = new Qiniu()

	async upload() {
		const { cloud, qiniu } = this.config
		if (cloud == CLOUDTYPE.QINIU) {
			if (qiniu) {
				return await this.qiniu.upload()
			}
		}
	}

	/**
	 * @description 获取上传云
	 * @returns
	 */
	async getUploadCloud() {
		const { cloud, qiniu } = this.config
		if (qiniu && cloud == CLOUDTYPE.QINIU) {
			return { type: CLOUDTYPE.QINIU }
		}
		// 默认
		return { type: CLOUDTYPE.QINIU }
	}
}

export const qiniu = new Qiniu()

export const coolFile = new CoolFile()

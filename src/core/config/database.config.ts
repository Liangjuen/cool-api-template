import 'reflect-metadata'
import { DataSource, DataSourceOptions } from 'typeorm'
import { Logger } from '@services'

export class DatabaseConfiguration {
	/**
	 * @description 数据源
	 */
	source: DataSource

	constructor(options: DataSourceOptions) {
		this.source = new DataSource(options)
	}

	/**
	 * @description 初始化
	 */
	async init() {
		try {
			await this.source.initialize()
			Logger.info(`✔️  数据库初始化完成!`)
		} catch (error) {
			Logger.error(`❌  数据库初始化失败: ${error}`)
		}
	}
}

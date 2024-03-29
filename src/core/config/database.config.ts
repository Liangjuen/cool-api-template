import 'reflect-metadata'
import { DataSource, DataSourceOptions } from 'typeorm'
import { Logger } from '@services'
import { TYPEORM } from './env.config'

class DatabaseConfiguration {
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
			Logger.info(`数据库初始化完成!`, { context: 'TypeORM' })
		} catch (error) {
			Logger.error(`数据库初始化失败: ${error}`, { context: 'TypeORM' })
		}
	}
}
// typeorm 数据库连接配置 可查阅: https://typeorm.biunav.com/zh/
const DataBase = new DatabaseConfiguration({
	type: TYPEORM.TYPE as 'mysql',
	host: TYPEORM.HOST,
	port: TYPEORM.PORT,
	username: TYPEORM.USER,
	password: TYPEORM.PWD,
	database: TYPEORM.DB,
	entities: [TYPEORM.ENTITIES],
	subscribers: [TYPEORM.SUBSCRIBERS],
	synchronize: TYPEORM.SYNC,
	logging: TYPEORM.LOG,
	cache: TYPEORM.CACHE,
	dateStrings: true,
	charset: 'utf8mb4'
})

export const DateSource = DataBase.source
export default DataBase

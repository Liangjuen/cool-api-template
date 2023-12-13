import { Application, DataBase, Redis, configuration } from '@config'
import { AppModule } from './app.module'
import { Logger } from '@services'

async function bootstrap() {
	try {
		/**
		 * 开始数据库的连接
		 */
		await DataBase.init()

		/**
		 * 开始 Redis 连接
		 */
		await Redis.connect()

		/**
		 * 初始化应用
		 */
		await Application.setup(AppModule, configuration())

		/**
		 * 开启监听
		 */
		await Application.listen()
	} catch (error) {
		console.log(error)

		Logger.error(`初始化失败: ${error}`)
	}
}

bootstrap()

import Express from 'express'
import bodyParser from 'body-parser'
import Cors from 'cors'

export class ExpressConfiguration {
	/**
	 * @description Express 应用实例
	 */
	app: Express.Application

	constructor() {
		this.app = Express()
	}

	plug() {}
}

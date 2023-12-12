import Express from 'express'

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

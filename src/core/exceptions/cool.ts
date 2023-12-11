/**
 * @description 自定义异常类型
 */
export class CoolException extends Error {
	/**
	 * @description 错误名
	 */
	name: string

	constructor(message: string) {
		super(message)
		this.name = this.constructor.name
		Error.captureStackTrace(this, this.constructor)
	}
}

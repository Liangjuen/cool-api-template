import { CoolException } from '@exceptions'
import { IHTTPException, IValidationErrorItem } from '@interfaces'

/**
 * @description 自定义异常
 */
export class CustomException extends CoolException implements IHTTPException {
	statusCode: number
	statusText: string
	errors: (string | IValidationErrorItem | never)[]
	// 在异常捕获工厂函数中标识为自定义异常
	readonly type: string = 'CustomException'

	constructor(
		name: string,
		statusCode: number,
		message: string,
		error?: string
	) {
		super(message)
		this.name = name
		this.statusCode = statusCode
		this.statusText = message
		this.errors = error ? [error] : []
	}
}

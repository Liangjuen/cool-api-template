import { ValidationErrorItem } from 'joi'
import { NotFound } from './4xx'
import { IError, IHTTPException, IValidationErrorItem } from '@interfaces'
import { CoolException } from './cool'
import { HttpResponseStatusCode as HttpCode } from '@enums'

/**
 * @description 404 用于抛出一个系统级 NotFound 错误
 */
export class NotFoundError extends NotFound {
	/**
	 * @description 返回一个 404 NotFound 错误
	 * @param error
	 */
	constructor(error: IError) {
		super(error.message)
	}
}

/**
 * @description 400 字段验证错误
 */
export class ValidationException
	extends CoolException
	implements IHTTPException
{
	statusCode: number

	statusText: string

	errors: Array<IValidationErrorItem>

	constructor(error: IError) {
		super('Validation Failed')
		this.statusCode = HttpCode.BadRequest
		this.statusText = '验证错误'
		this.errors = this.convertError(error.details || [])
		this.name = 'BadRequest'
		this.message = this.convertError(error.details || [])[0].message
	}

	/**
	 * @description 将Joi验证错误转换为字符串
	 *
	 * @param errors Joi验证错误数组
	 */
	private convertError(errors: ValidationErrorItem[]): IValidationErrorItem[] {
		return errors.map((err): IValidationErrorItem => {
			console.log('excptions.common.validation:', err)

			return {
				key: err.context?.key || '',
				message: err.message
			}
		})
	}
}

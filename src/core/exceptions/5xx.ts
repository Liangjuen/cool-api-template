import { CoolException } from '@exceptions'
import { IError, IHTTPException } from '@interfaces'
import { HttpResponseMessage as Msg } from '@constants'
import { HttpResponseStatusCode as HttpCode } from '@enums'

/**
 * @description 500 ServerException class
 */
export class ServerException extends CoolException implements IHTTPException {
	statusCode: number

	statusText: string

	errors: Array<string>

	/**
	 * @description 返回一个 500 InternalServerError
	 * @param error
	 */
	constructor(error: IError) {
		super('Internal Server Error')
		this.statusCode = HttpCode.InternalServerError
		this.statusText = Msg[HttpCode.InternalServerError]
		this.errors = error.message ? [error.message] : []
		this.stack = error.stack
	}
}

/**
 * @description 自定义类型MySQL错误
 */
export class MySQLException extends CoolException implements IHTTPException {
	statusCode: number

	statusText: string

	errors: Array<string>

	/**
	 * @description 抛出 4xx Mysql 故障错误
	 * @param error 4xx
	 */
	constructor(error: IError) {
		super('Mysql引擎故障')
		const converted = this.convert(
			error.errno as number,
			error.message as string
		)
		this.statusCode = converted.statusCode
		this.statusText = converted.statusText
		this.errors = [converted.error]
	}

	/**
	 * @description 创建/更新失败时的回退MySQL错误
	 *
	 * @param errno
	 * @param message
	 *
	 * @example 1052 ER_NON_UNIQ_ERROR
	 * @example 1054 ER_BAD_FIELD_ERROR
	 * @example 1062 DUPLICATE_ENTRY
	 * @example 1452 ER_NO_REFERENCED_ROW_2
	 * @example 1364 ER_NO_DEFAULT_FOR_FIELD
	 * @example 1406 ER_DATA_TOO_LONG
	 */
	private convert(
		errno: number,
		message: string
	): { statusCode: number; statusText: string; error: string } {
		switch (errno) {
			case 1052:
				return {
					statusCode: HttpCode.Conflict,
					statusText: Msg[HttpCode.Conflict],
					error: message
				}
			case 1054:
				return {
					statusCode: HttpCode.Conflict,
					statusText: Msg[HttpCode.Conflict],
					error: message
				}
			case 1062:
				return {
					statusCode: HttpCode.Conflict,
					statusText: Msg[HttpCode.Conflict],
					error: message
				}
			case 1452:
				return {
					statusCode: HttpCode.Conflict,
					statusText: Msg[HttpCode.Conflict],
					error: message
				}
			case 1364:
				return {
					statusCode: HttpCode.UnprocessableEntity,
					statusText: Msg[HttpCode.UnprocessableEntity],
					error: message
				}
			case 1406:
				return {
					statusCode: HttpCode.UnprocessableEntity,
					statusText: Msg[HttpCode.UnprocessableEntity],
					error: message
				}
			default:
				return {
					statusCode: HttpCode.UnprocessableEntity,
					statusText: Msg[HttpCode.UnprocessableEntity],
					error: message
				}
		}
	}
}

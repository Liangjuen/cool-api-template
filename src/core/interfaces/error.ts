import { ValidationErrorItem } from 'joi'

/**
 * 定义通用错误接口
 */
export interface IError {
	/**
	 * @description 某些错误的特定错误消息
	 */
	code?: string

	/**
	 * @description 错误名
	 */
	name: string

	/**
	 * @description MySQL 错误状态码
	 */
	errno?: number

	/**
	 * @description MySQL 错误消息
	 */
	sqlMessage?: string

	/**
	 * @description 错误消息
	 */
	message?: string

	/**
	 * @description 错误调用堆栈
	 */
	stack?: string

	/**
	 * @description http 错误状态码
	 */
	httpStatusCode?: number

	/**
	 * @description 错误状态别名
	 */
	status?: number

	/**
	 * @description 错误状态码
	 */
	statusCode?: number

	/**
	 * @description Joi 错误描述
	 */
	isJoi?: boolean

	/**
	 * @description 验证错误信息
	 */
	statusText?: string

	/**
	 * @description 错误的细节
	 */
	errors?: Array<{ field: string; types: string; messages: string }> | string[]

	/**
	 * @description 验证错误详细信息
	 */
	details?: Array<ValidationErrorItem>

	/**
	 * @description 错误类型标识(仅用于自定义错误类型)
	 */
	type?: string
}

/**
 * 自定义数据校验错误输出格式
 */
export interface IValidationErrorItem {
	key: string
	message: string
}

/**
 * 定义错误输出格式
 */
export interface IHTTPException {
	/**
	 * @description HTTP响应状态码
	 */
	statusCode: number

	/**
	 * @description HTTP响应状态消息
	 */
	statusText: string

	/**
	 * @description HTTP响应错误
	 */
	errors: Array<string | IValidationErrorItem | never>

	/**
	 * @description 描述
	 */
	message?: string

	/**
	 * @description 堆栈
	 */
	stack?: string
}

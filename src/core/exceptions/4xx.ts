import { HttpResponseMessage as Msg } from '@constants'
import { HttpResponseStatusCode as HttpCode } from '@enums'
import { CustomException } from './custom'

/**
 * @description 400 BadRequest class
 */
export class BadRequest extends CustomException {
	/**
	 * @description 返回一个 400 BadRequest 错误
	 * @param message 错误消息
	 * @returns 400 BadRequest error
	 */
	constructor(message?: string) {
		super(
			'BadRequest',
			HttpCode.BadRequest,
			message || Msg[HttpCode.BadRequest],
			message
		)
	}
}

/**
 * @description 401 Unauthorized class
 */
export class Unauthorized extends CustomException {
	/**
	 * @description 返回一个 401 Unauthorized 错误
	 * @param message 错误消息
	 * @returns 401 Unauthorized error
	 */
	constructor(message?: string) {
		super(
			'Unauthorized',
			HttpCode.Unauthorized,
			message || Msg[HttpCode.Unauthorized],
			message
		)
	}
}

/**
 * @description 403 Forbidden class
 */
export class Forbidden extends CustomException {
	/**
	 * @description 返回一个 403 Forbidden 错误
	 * @param message 错误消息
	 * @returns 403 Forbidden error
	 */
	constructor(message?: string) {
		super(
			'Forbidden',
			HttpCode.Forbidden,
			message || Msg[HttpCode.Forbidden],
			message
		)
	}
}

/**
 * @description 404 NotFound class
 */
export class NotFound extends CustomException {
	/**
	 * @description 返回一个 403 NotFound 错误
	 * @param message 错误消息
	 * @returns 404 NotFound error
	 */
	constructor(message?: string) {
		super(
			'NotFound',
			HttpCode.NotFound,
			message || Msg[HttpCode.NotFound],
			message
		)
	}
}

/**
 * @description 405 MethodNotAllowed class
 */
export class MethodNotAllowed extends CustomException {
	/**
	 * @description 返回一个 405 MethodNotAllowed 错误
	 * @param message 错误消息
	 * @returns 405 MethodNotAllowed error
	 */
	constructor(message?: string) {
		super(
			'MethodNotAllowed',
			HttpCode.MethodNotAllowed,
			message || Msg[HttpCode.MethodNotAllowed],
			message
		)
	}
}

/**
 * @description 406 NotAcceptable class
 */
export class NotAcceptable extends CustomException {
	/**
	 * @description 返回一个 406 NotAcceptable 错误
	 * @param message 错误消息
	 * @returns 406 NotAcceptable error
	 */
	constructor(message?: string) {
		super(
			'NotAcceptable',
			HttpCode.NotAcceptable,
			message || Msg[HttpCode.NotAcceptable],
			message
		)
	}
}

/**
 * @description 409 NotAcceptable class
 */
export class Conflict extends CustomException {
	/**
	 * @description 返回一个 409 Conflict 错误
	 * @param message 错误消息
	 * @returns 409 Conflict error
	 */
	constructor(message?: string) {
		super(
			'Conflict',
			HttpCode.Conflict,
			message || Msg[HttpCode.Conflict],
			message
		)
	}
}

/**
 * @description 417 ExpectationFailed class
 */
export class ExpectationFailed extends CustomException {
	/**
	 * @description 返回一个 417 ExpectationFailed 错误
	 * @param message 错误消息
	 * @returns 417 ExpectationFailed error
	 */
	constructor(message?: string) {
		super(
			'ExpectationFailed',
			HttpCode.ExpectationFailed,
			message || Msg[HttpCode.ExpectationFailed],
			message
		)
	}
}

/**
 * @description 422 UnprocessableEntity class
 */
export class UnprocessableEntity extends CustomException {
	/**
	 * @description 返回一个 422 UnprocessableEntity 错误
	 * @param message 错误消息
	 * @returns 422 UnprocessableEntity error
	 */
	constructor(message?: string) {
		super(
			'UnprocessableEntity',
			HttpCode.UnprocessableEntity,
			message || Msg[HttpCode.UnprocessableEntity],
			message
		)
	}
}

/**
 * @description 429 TooManyRequests class
 */
export class TooManyRequests extends CustomException {
	/**
	 * @description 返回一个 429 TooManyRequests 错误
	 * @param message 错误消息
	 * @returns 429 TooManyRequests error
	 */
	constructor(message?: string) {
		super(
			'TooManyRequests',
			HttpCode.TooManyRequests,
			message || Msg[HttpCode.TooManyRequests],
			message
		)
	}
}

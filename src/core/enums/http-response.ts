/**
 * 常用 HTTP 响应状态码
 */
export enum HttpResponseStatusCode {
	Ok = 200,
	Created = 201,
	NoContent = 204,
	BadRequest = 400,
	Unauthorized = 401,
	Forbidden = 403,
	NotFound = 404,
	MethodNotAllowed = 405,
	NotAcceptable = 406,
	Conflict = 409,
	ExpectationFailed = 417,
	UnprocessableEntity = 422,
	TooManyRequests = 429,
	InternalServerError = 500
	// more...
}

/**
 * 返回状态码
 */
export const enum APICode {
	failed = 0,
	success
}

/**
 * 返回提示信息
 */
export const enum APIMessage {
	success = 'success',
	failed = 'failed'
}

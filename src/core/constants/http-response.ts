import { HttpResponseStatusCode as HTTPCode } from '@enums'

export const HttpResponseMessage = {
	[HTTPCode.Ok]: 'ok',
	[HTTPCode.Created]: '已创建',
	[HTTPCode.NoContent]: '无内容',
	[HTTPCode.BadRequest]: '请求中有错误参数',
	[HTTPCode.Unauthorized]: '身份验证未通过',
	[HTTPCode.Forbidden]: '无权访问',
	[HTTPCode.NotFound]: '找不到请求的资源',
	[HTTPCode.NotAcceptable]: '不能接受的请求',
	[HTTPCode.MethodNotAllowed]: '目标资源不支持该方法',
	[HTTPCode.TooManyRequests]: '请求太过频繁',
	[HTTPCode.InternalServerError]: '服务端错误',
	[HTTPCode.Conflict]: '和被请求的资源的当前状态之间存在冲突',
	[HTTPCode.ExpectationFailed]: '未满足期望值',
	[HTTPCode.UnprocessableEntity]: '为经过加工的实体'
	// more ...
}

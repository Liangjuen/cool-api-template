import { Request } from 'express'

/**
 * @description Express 派生请求对象
 * @param user 用户认证信息
 * @param query 请求的 query
 * @param params 请求的 params
 */
export interface IRequest<T = any> extends Request {
	user?: T
	query: Record<string, string>
	params: Record<string, string>
}

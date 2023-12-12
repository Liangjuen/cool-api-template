import { Request } from 'express'

/**
 * @description Express 派生请求对象
 */
export interface IRequest extends Request {
	user?: any
	query: Record<string, string>
	params: Record<string, string>
}

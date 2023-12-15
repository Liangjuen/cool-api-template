import { HttpResponseStatusCode as HttpCode } from '@enums'

/**
 * @description 获取 http status code
 * @param method 请求方法
 * @param hasContent 是否有内容
 * @returns
 */
export const getStatusCode = (method: string, hasContent: boolean): number => {
	switch (method) {
		case 'GET':
			return HttpCode.Ok
		case 'POST':
			return hasContent ? HttpCode.Created : HttpCode.NoContent
		case 'PUT':
		case 'PATCH':
			return hasContent ? HttpCode.Ok : HttpCode.NoContent
		case 'DELETE':
			return HttpCode.NoContent
	}
}

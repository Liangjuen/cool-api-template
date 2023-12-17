import { NextFunction, Response } from 'express'
import { IRequest, IResponse } from '@interfaces'
import { Auth, JwtPayload } from '@api/services/auth.service'
import { Redis } from '@config'
import { AUTH } from '@constants'
import { Unauthorized, Forbidden } from '@exceptions'

export class Guard {
	/**
	 * @description token 校验
	 */
	static checkJwt = async (
		req: IRequest,
		res: Response,
		next: NextFunction
	) => {
		//从头部获取jwt令牌
		const tokenStr = req.headers[AUTH] || ''
		const token = tokenStr.replace('Bearer ', '')
		req.headers[AUTH] = token

		// 无 token 则直接返回无权限
		if (!token) return next(new Forbidden())

		// 查询 Redis 黑名单
		const userId = await Redis.client.get(token)

		// 如果查询到在黑名单则 响应重新登录
		if (userId && userId !== null)
			return next(new Unauthorized('令牌失效，请重新登录'))

		let jwtPayload: JwtPayload

		// 验证令牌并获取数据
		try {
			jwtPayload = Auth.verify(token)
			req.user = jwtPayload
		} catch (error) {
			//如果令牌无效，则响应401(未授权)
			return next(new Unauthorized(error.message))
		}

		//设置令牌有效期
		//每个请求都发送一个新的令牌
		const newToken = Auth.getNewToken(jwtPayload)
		res.setHeader('token', newToken)
		next()
	}

	/**
	 * @description 权限校验
	 */
	static checkPermission = () => {
		return async (req: IRequest, res: IResponse, next: NextFunction) => {
			next()
		}
	}
}

import { NextFunction, Response } from 'express'
import { IRequest, IResponse } from '@interfaces'
import { Auth, JwtPayload } from '@api/services/auth.service'
import { Redis } from '@config'
import { AUTH } from '@constants'
import { Unauthorized, Forbidden } from '@exceptions'
import { RoleCache } from '../services/role.cache.service'
import { ROLE } from '@shared/enums'

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
		if (userId && userId !== null) return next(new Unauthorized('已退出登录'))

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
		// const newToken = Auth.getNewToken(jwtPayload)
		// res.setHeader('token', newToken)
		next()
	}

	/**
	 * @description 权限校验
	 */
	static checkPermission = (permCode: string) => {
		return async (
			req: IRequest<JwtPayload>,
			res: IResponse,
			next: NextFunction
		) => {
			try {
				if (!req?.user?.roles) return next(new Forbidden('无权访问该接口'))
				// 如果为超管放行
				if (req?.user?.roles.includes(ROLE.Admin)) return next()

				const rolePerm = await RoleCache.get()

				if (rolePerm == null) throw new Error('未获取到角色权限信息')

				// 有权限标识
				let isAuth = false

				req.user.roles.forEach(role => {
					if (rolePerm[role]) {
						if (isAuth) return
						isAuth = rolePerm[role].includes(permCode)
					}
				})

				// 没有获取到权限返回无权限
				if (!isAuth) return next(new Forbidden('无权访问该接口'))

				// 有权限放行
				next()
			} catch (error) {
				next(error)
			}
		}
	}
}

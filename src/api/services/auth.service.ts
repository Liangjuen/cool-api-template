import * as jwt from 'jsonwebtoken'
import { ACCESS_TOKEN } from '@config/env.config'
import { User } from '@api/modules/base/user/user.entity'
import { CacheService } from '@services'

export type JwtPayload = Pick<User, 'username' | 'id' | 'email' | 'roles'>

export class Auth {
	static baseWhiteListKey = 'token:useful:list:'

	static whiteListKey = (user: JwtPayload) => Auth.baseWhiteListKey + user.id

	/**
	 * 校验密码
	 * @param unencryptedPassword 未加密的密码(要校验的密码)
	 * @param user 当前用户实体
	 * @returns
	 */
	static passwordMatches = async (
		unencryptedPassword: string,
		user: User
	): Promise<boolean> => {
		return await user.passwordMatches(unencryptedPassword)
	}

	/**
	 * 获取token
	 * @param param Payload(用户信息)
	 * @returns
	 */
	static createToken = async ({ username, id, roles, email }: User) => {
		const jwtPayload: JwtPayload = {
			username,
			id,
			roles,
			email
		}
		return {
			token: jwt.sign(jwtPayload, ACCESS_TOKEN.SECRET, {
				expiresIn: ACCESS_TOKEN.DURATION
			}),
			expiration: ACCESS_TOKEN.DURATION
		}
	}

	/**
	 * 获取一个新 token
	 * @param payload 用户信息
	 * @returns
	 */
	static getNewToken = (payload: JwtPayload): string =>
		jwt.sign(payload, ACCESS_TOKEN.SECRET, { expiresIn: ACCESS_TOKEN.DURATION })

	/**
	 * 验证用户token
	 * @param token 用户 token
	 * @returns
	 */
	static verify = (token: string): JwtPayload => {
		const { username, id, email, roles } = <JwtPayload>(
			jwt.verify(token, ACCESS_TOKEN.SECRET)
		)
		return {
			username,
			id,
			email,
			roles
		}
	}

	/**
	 * @description 将 token 加入 redis 白名单中
	 * @param token
	 * @param user
	 */
	static tokenWhitelisting = async (token: string, user: JwtPayload) => {
		// 将 token 存入 Redis 并设置过期
		await CacheService.set(
			Auth.whiteListKey(user),
			token,
			ACCESS_TOKEN.DURATION
		)
	}

	/**
	 * @description 判断用户是否在白单
	 * @param user 用户信息
	 * @returns
	 */
	static whiteListHas = async (user: JwtPayload | User, token: string) => {
		const result = await CacheService.get(Auth.whiteListKey(user))
		return result == token
	}

	/**
	 * @description 删除一项
	 * @param user 用户信息
	 * @returns
	 */
	static delWhiteListItem = async (user: JwtPayload | User) => {
		return await CacheService.engine.del(Auth.whiteListKey(user))
	}
}

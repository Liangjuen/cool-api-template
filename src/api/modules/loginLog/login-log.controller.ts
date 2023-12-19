/* eslint-disable @typescript-eslint/no-unused-vars */
import * as UserAgent from 'express-useragent'
import { Request } from 'express'
import { LoginLogRepository } from './login.repository'
import { IRequest, IResponse } from '@interfaces'
import { IRequestParams } from '@shared/interfaces'
import { Resolve } from '@decorators'
import { User } from '@api/modules/base/user/user.entity'
import { LoginState } from './login-log.enum'
import { extract } from '@shared/utils/clientRequestParse'

export class LoginLogController {
	/**
	 * @description 创建新 log
	 * @param req
	 * @param user
	 * @param state
	 * @param message
	 */
	static async create(
		req: IRequest,
		user: User,
		state: LoginState,
		message: string
	) {
		// 获取 user-agent 和 ip
		const { os, version, browser, isMobile } = UserAgent.parse(
			req.headers['user-agent']
		)
		const { ip } = extract(req)
		const { username, id } = user

		const repository = new LoginLogRepository()

		// 创建
		await repository.new({
			userId: id,
			username,
			ip,
			os,
			browser: `${browser}(${version})`,
			isMobile,
			message,
			loginState: state
		})
	}

	/**
	 * @description 获取登录日志列表
	 * @param req
	 * @param res
	 */
	@Resolve()
	static async list(req: IRequest, res: IResponse) {
		const loginLogepository = new LoginLogRepository()
		const { result, total, cPage, size } = await loginLogepository.list(
			req.query
		)
		res.locals.data = result
		res.locals.meta = {
			total,
			current: cPage,
			size
		}
	}

	/**
	 * @description 删除给定的 ID 数组对应的登录日志
	 * @param req
	 * @param res
	 */
	@Resolve()
	static async remove(req: Request<IRequestParams>) {
		const ids = (req.params.ids as string).split(',').map(s => parseInt(s, 10))
		const loginLogepository = new LoginLogRepository()
		await loginLogepository.delete(ids)
	}

	/**
	 * @description 删除所有日志
	 */
	@Resolve()
	static async clear(req: Request, res: IResponse) {
		const loginLogepository = new LoginLogRepository()
		await loginLogepository.clear()
	}
}

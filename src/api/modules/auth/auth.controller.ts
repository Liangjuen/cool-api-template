import { Resolve } from '@decorators'
import { IRequest, IResponse } from '@interfaces'
import { Auth as AuthService } from '@api/services/auth.service'
import { UserRepository } from '../base/user/user.repository'
import { BadRequest, NotFound } from '@exceptions'
import { AUTH } from '@constants/auth'
import { LoginLogController } from '@api/modules/loginLog/login-log.controller'

export class AuthController {
	/**
	 * @description 邮箱注册
	 * @param req
	 * @param res
	 */
	@Resolve()
	static async register(req: IRequest, res: IResponse) {
		const repository = new UserRepository()
		const { username, password, email } = req.body

		const user = repository.create({ username, password, email })
		// 查询是否有重复 email、用户名
		const findUser = await repository.findOneBy({ username, email })
		if (findUser) {
			let message: string
			if (findUser.username == username) message = '用户名已被使用'
			if (findUser.email == email) message = '邮箱已被注册'
			throw new BadRequest(message)
		}
		await repository.save(user)
		const { token } = await AuthService.createToken(user)
		res.locals.data = { token }
	}

	/**
	 * @description 通过 emial、password 登录
	 * @param req
	 * @param res
	 */
	@Resolve()
	static async login(req: IRequest, res: IResponse) {
		const repository = new UserRepository()
		const { email, password } = req.body
		const query = repository
			.createQueryBuilder('user')
			.andWhere('user.email = :email', { email })
			.addSelect('user.password')
		const user = await query.getOne()
		let message: string = '登录成功'
		if (user == null) {
			message = '未查询到用户'
			throw new NotFound(message)
		}

		const result = await user.passwordMatches(password)
		if (!result) {
			message = '邮箱或密码错误'
			LoginLogController.create(req, user, 0, message)
			throw new BadRequest(message)
		}

		const { token } = await AuthService.createToken(user)
		delete user.password

		res.locals.data = {
			token,
			user
		}
		res.locals.msg = message
		LoginLogController.create(req, user, 1, message)
	}

	/**
	 * @description 注销
	 * @param req
	 * @param res
	 */
	@Resolve()
	static async logout(req: IRequest) {
		await AuthService.tokenBlacklisting(req.headers[AUTH], req.user)
	}
}

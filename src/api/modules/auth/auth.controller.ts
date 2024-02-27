import { In } from 'typeorm'
import { Resolve } from '@decorators'
import { IRequest, IResponse } from '@interfaces'
import { Auth as AuthService, JwtPayload } from '@api/services/auth.service'
import { UserRepository } from '../base/user/user.repository'
import { BadRequest, NotFound } from '@exceptions'
import { AUTH } from '@constants/auth'
import { LoginLogController } from '@api/modules/loginLog/login-log.controller'
import { MenuRepository } from '@api/modules/base/menu/menu.repository'
import { RoleRepository } from '@api/modules/base/role/role.repository'
import { ROLE } from '@api/shared/enums'

export class AuthController {
	/**
	 * @description 获取角色菜单/权限列表
	 * @param roleCodes
	 * @returns
	 */
	static async getRolePermMenus(roleCodes: string[]) {
		const menuRepo = new MenuRepository()

		// 判断是否为超管
		if (roleCodes.includes(ROLE.Admin)) {
			return await menuRepo.getMenus([], true)
		} else {
			const roleRepo = new RoleRepository()

			const roles = await roleRepo.find({
				select: ['menuIdList'],
				where: { code: In(roleCodes) }
			})

			const menuIdList = []
			roles.map(r => r.menuIdList).forEach(m => menuIdList.push(...m))

			return await menuRepo.getMenus([...new Set(menuIdList)])
		}
	}

	/**
	 * @description 邮箱注册
	 * @param req
	 * @param res
	 */
	@Resolve()
	static async register(req: IRequest<JwtPayload>, res: IResponse) {
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
		const { menus, perms } = await AuthController.getRolePermMenus(user.roles)
		res.locals.data = {
			token,
			user,
			menus,
			perms
		}
		res.locals.msg = message
		LoginLogController.create(req, user, 1, message)
	}

	/**
	 * @description 通过 username、password 登录
	 * @param req
	 * @param res
	 */
	@Resolve()
	static async usernameLogin(req: IRequest, res: IResponse) {
		const repository = new UserRepository()
		const { username, password } = req.body
		const query = repository
			.createQueryBuilder('user')
			.andWhere('user.username = :username', { username })
			.addSelect('user.password')
		const user = await query.getOne()
		let message: string = '登录成功'
		if (user == null) {
			message = '未查询到用户'
			throw new NotFound(message)
		}

		const result = await user.passwordMatches(password)
		if (!result) {
			message = '用户名或密码错误'
			LoginLogController.create(req, user, 0, message)
			throw new BadRequest(message)
		}

		const { token } = await AuthService.createToken(user)
		delete user.password

		const { menus, perms } = await AuthController.getRolePermMenus(user.roles)

		res.locals.data = {
			token,
			user,
			menus,
			perms
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
	static async logout(req: IRequest<JwtPayload>) {
		await AuthService.tokenBlacklisting(req.headers[AUTH], req.user)
	}
}

import { IRequest, IResponse } from '@interfaces'
import { NotFound, BadRequest } from '@exceptions'
import { Resolve } from '@decorators'
import { User } from './user.entity'
import { IUserRequest } from './user.interface'
import { UserRepository } from './user.repository'

export class UserController {
	private constructor() {}

	/**
	 * @description 获取用户信息
	 * @param req
	 * @param res
	 */
	@Resolve()
	static async get(req: IRequest, res: IResponse) {
		const repository = new UserRepository()
		const user = await repository.one(parseInt(req.params.id, 10))
		if (!user) throw new NotFound('没有查询到相关用户')
		res.locals.data = user
	}

	/**
	 * @description 获取用户列表
	 * @param req
	 * @param res
	 */
	@Resolve()
	static async list(req: IRequest, res: IResponse) {
		const userRepository = new UserRepository()
		res.locals.data = await userRepository.list(req.query)
	}

	/**
	 * @description 创建用户
	 * @param req
	 * @param res
	 */
	@Resolve()
	static async create(req: IUserRequest, res: IResponse) {
		const repository = new UserRepository()
		const findUser = await repository.findOneBy({ username: req.body.username })

		// 判断用户名、邮箱是否有重复
		if (findUser) throw new BadRequest('用户名重复')
		const findUserWithEmial = await repository.findOneBy({
			email: req.body.email
		})
		if (findUserWithEmial) throw new BadRequest('邮箱已被注册')

		// 创建用户
		const user = repository.create(req.body)
		const result = await repository.save(user)
		delete result.password
		res.locals.data = result
	}

	/**
	 * @description 更新用户
	 * @param req
	 * @param res
	 */
	@Resolve()
	static async update(req: IUserRequest, res: IResponse) {
		const repository = new UserRepository()
		const id = parseInt(req.params.id, 10)
		let findUser: User

		// 更新用户密码
		if (req.body.password && req.body.oldPassword) {
			if (req.body.password === req.body.oldPassword)
				throw new BadRequest('新旧密码一致')
			// 校验密码是否正确
			const { result, user } = await repository.checkPassword(
				id,
				req.body.oldPassword
			)
			if (!result) throw new BadRequest('密码错误')
			findUser = user
		} else {
			findUser = await repository.findOneByOrFail({ id })
		}

		repository.merge(findUser, req.body)
		await findUser.hashPassword()
		await repository.save(findUser)
		res.locals.data = findUser
	}

	/**
	 * @description 删除给定的 id 关联的用户
	 * @param req
	 * @param res
	 */
	@Resolve()
	static async remove(req: IUserRequest) {
		const repository = new UserRepository()
		const ids = (req.params.ids as string).split(',').map(s => parseInt(s, 10))
		void (await repository.delete(ids))
	}
}

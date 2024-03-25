import { IRequest, IResponse } from '@interfaces'
import { NotFound } from '@exceptions'
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
		const { username, nickName, phone, email, departmentId } = req.body

		await repository.checkIfFieldsExist({
			username,
			phone,
			email,
			nickName
		})

		const password = '123456'
		// 创建用户
		const user = repository.create({
			...req.body,
			password,
			departmentId: parseInt(departmentId, 10)
		})
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
		const { username, phone, email, nickName } = req.body
		const repository = new UserRepository()
		const id = parseInt(req.params.id, 10)
		const departmentId = parseInt(req.body.departmentId, 10)

		await repository.checkIfFieldsExist({
			username,
			phone,
			email,
			nickName,
			id
		})

		let findUser: User
		findUser = await repository.findOneBy({ id })
		repository.merge(findUser, { ...req.body, departmentId })
		if (req.body.password) await findUser.hashPassword()
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

	/**
	 * @description 重置密码
	 * @param req
	 * @param res
	 */
	@Resolve()
	static async resetPassword(req: IUserRequest, res: IResponse) {
		const rep = new UserRepository()
		const { password } = req.body
		const id = parseInt(req.params.id, 10)
		const user = await rep.findOneBy({ id })
		const mergeUser = rep.merge(user, { password })
		await mergeUser.hashPassword()
		rep.save(mergeUser)
		res.locals.data = mergeUser
	}
}

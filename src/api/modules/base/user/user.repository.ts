import { Repository, Brackets } from 'typeorm'
import { DateSource } from '@config'
import { User } from './user.entity'
import { IUserQuery } from './user.interface'
import { BadRequest } from '@exceptions'

export class UserRepository extends Repository<User> {
	constructor() {
		super(User, DateSource.createEntityManager())
	}
	/**
	 * @description 获取用户列表
	 * @param param IUserQuery
	 * @returns
	 */
	async list({
		page = 1,
		size = 30,
		keyword,
		startDate,
		endDate,
		role,
		status,
		gender,
		departmentIds
	}: IUserQuery): Promise<{
		result: User[]
		total: number
		cPage: number
		size: number
	}> {
		const skip =
			(parseInt(page as string, 10) - 1) * parseInt(size as string, 10)
		const take = parseInt(size as string, 10)
		const query = this.createQueryBuilder('user')

		if (departmentIds) {
			const departIds = departmentIds.split(',').map(s => parseInt(s, 10))
			query.andWhere('departmentId IN (:...departIds)', { departIds })
		}

		if (keyword) {
			query.andWhere(
				'username LIKE :username OR name LIKE :name OR nickName LIKE :nickName OR phone LIKE :phone OR email LIKE :email',
				{
					username: '%' + keyword + '%',
					name: '%' + keyword + '%',
					nickName: '%' + keyword + '%',
					phone: '%' + keyword + '%',
					email: '%' + keyword + '%'
				}
			)
		}

		if (role) {
			query.andWhere('roles LIKE :role', { role: '%' + role + '%' })
		}

		if (status) {
			query.andWhere('status = :status', { status })
		}

		if (gender) {
			query.andWhere('gender = :gender', { gender })
		}

		if (startDate && endDate) {
			query.andWhere('createdAt BETWEEN :startDate AND :endDate', {
				startDate,
				endDate
			})
		}

		query.addOrderBy('createdAt', 'DESC')

		const [result, total] = await query.skip(skip).take(take).getManyAndCount()

		return {
			result,
			total,
			cPage: skip + 1,
			size: take
		}
	}

	/**
	 * @description 获取用户
	 *
	 * @param id 用户 ID
	 */
	async one(id: number): Promise<User> {
		return await this.findOne({ where: { id } })
	}

	/**
	 * @description 获取用户
	 *
	 * @param username 用户名
	 */
	async findOneByUserName(username: string): Promise<User> {
		return await this.findOne({ where: { username } })
	}

	/**
	 * @description 校验密码是否正确
	 * @param id
	 * @returns
	 */
	async checkPassword(
		id: number,
		password: string
	): Promise<{ user: User; result: boolean }> {
		const query = this.createQueryBuilder('user')
			.andWhere('user.id = :id', { id })
			.addSelect('user.password')
		const user = await query.getOneOrFail()
		const result = await user.passwordMatches(password)
		delete user.password
		return { user, result }
	}

	/**
	 * @description 检查字段是否存在冲突(更新/创建)
	 * @param param
	 */
	async checkIfFieldsExist({
		id,
		username,
		nickName,
		email,
		phone
	}: {
		id?: number
		username: string
		nickName: string
		email?: string
		phone?: string
	}) {
		const personQuery = this.createQueryBuilder('user').where(
			new Brackets(qb => {
				qb.where('user.username = :username', { username }).orWhere(
					'user.nickName = :nickName',
					{ nickName }
				)

				if (phone) qb.orWhere('user.phone = :phone', { phone })
				if (email) qb.orWhere('user.email = :email', { email })
			})
		)

		if (id) personQuery.andWhere('user.id != :id', { id })

		const findPerson = await personQuery.getOne()

		if (findPerson) {
			if (findPerson.username == username)
				throw new BadRequest('用户名已被占用')
			if (findPerson.nickName == nickName) throw new BadRequest('昵称已被占用')
			if (findPerson.phone == phone) throw new BadRequest('手机号名已被占用')
			if (findPerson.email == email) throw new BadRequest('邮箱已被占用')
		}
	}
}

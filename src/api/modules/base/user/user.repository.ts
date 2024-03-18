import { Repository } from 'typeorm'
import { DateSource } from '@config'
import { User } from './user.entity'
import { IUserQuery } from './user.interface'

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
		username,
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
			query.andWhere('departmentId IN (:...departmentIds)', { departmentIds })
		}

		if (username) {
			query.andWhere('username LIKE :username', {
				username: '%' + username + '%'
			})
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
}

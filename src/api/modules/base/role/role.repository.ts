import { Repository, Brackets } from 'typeorm'
import { DateSource } from '@config'
import { Role } from './role.entity'
import { IRoleQuery } from './role.interface'
import { toSkipAndTake } from '@shared/utils/query'
import { Status } from '@shared/enums'
import { BadRequest } from '@exceptions'

export class RoleRepository extends Repository<Role> {
	constructor() {
		super(Role, DateSource.createEntityManager())
	}

	async list({
		page = 1,
		size = 30,
		sort = 'createdAt',
		order = 'DESC',
		keyword,
		status
	}: IRoleQuery): Promise<{
		result: Role[]
		total: number
		cPage: number
		size: number
	}> {
		const { take, skip, cPage } = toSkipAndTake(page, size)
		const query = this.createQueryBuilder('role')

		if (keyword) {
			query.andWhere('role.name LIKE :name OR role.code LIKE :code', {
				name: '%' + keyword + '%',
				code: '%' + keyword + '%'
			})
		}

		if (status) {
			query.andWhere('status = :status', { status })
		}

		query.orderBy(sort, order)

		const [result, total] = await query.skip(skip).take(take).getManyAndCount()

		return {
			result,
			total,
			cPage,
			size: take
		}
	}

	async allFali() {
		return await this.findBy({ status: Status.normal })
	}

	/**
	 * @description 检查字段是否存在冲突(更新/创建)，更新时传入 id
	 * @param param
	 */
	async checkIfFieldsExist({
		id,
		name,
		code
	}: {
		id?: number
		name: string
		code: string
	}) {
		const roleQuery = this.createQueryBuilder('role')

		roleQuery.where(
			new Brackets(qb => {
				qb.where('role.name = :name', { name }).orWhere('role.code = :code', {
					code
				})
			})
		)

		if (id) roleQuery.andWhere('role.id != :id', { id })

		const findRole = await roleQuery.getOne()
		if (findRole) {
			if (findRole.name == name) throw new BadRequest('名称已被占用')
			if (findRole.code == code) throw new BadRequest('编码已被占用')
		}
	}
}

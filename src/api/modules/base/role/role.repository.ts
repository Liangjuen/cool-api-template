import { Repository } from 'typeorm'
import { DateSource } from '@config'
import { Role } from './role.entity'
import { IRoleQuery } from './role.interface'
import { toSkipAndTake } from '@shared/utils/query'
import { Status } from '@shared/enums'

export class RoleRepository extends Repository<Role> {
	constructor() {
		super(Role, DateSource.createEntityManager())
	}

	async list({
		page = 1,
		size = 30,
		sort = 'createdAt',
		order = 'DESC',
		name,
		startDate,
		endDate,
		code,
		status
	}: IRoleQuery): Promise<{
		result: Role[]
		total: number
		cPage: number
		size: number
	}> {
		const { take, skip } = toSkipAndTake(page, size)
		const query = this.createQueryBuilder('role')

		if (name) {
			query.andWhere('name LIKE :name', {
				name: '%' + name + '%'
			})
		}

		if (code) {
			query.andWhere('code LIKE :code', { code: '%' + code + '%' })
		}

		if (status) {
			query.andWhere('status = :status', { status })
		}

		if (startDate && endDate) {
			query.andWhere('createdAt BETWEEN :startDate AND :endDate', {
				startDate,
				endDate
			})
		}

		query.orderBy(sort, order)

		const [result, total] = await query.skip(skip).take(take).getManyAndCount()

		return {
			result,
			total,
			cPage: skip + 1,
			size: take
		}
	}

	async allFali() {
		return await this.findBy({ status: Status.normal })
	}
}

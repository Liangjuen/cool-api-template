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
}

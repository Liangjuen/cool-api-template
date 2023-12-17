import { Repository } from 'typeorm'
import { DateSource } from '@config'
import { Dict } from './dict.entity'
import { IDictQueryString } from './dict.interface'

export class DictRepository extends Repository<Dict> {
	constructor() {
		super(Dict, DateSource.createEntityManager())
	}

	/**
	 * @description 获取字典列表
	 * @param param
	 * @returns
	 */
	async list({
		sort = 'orderNum',
		order = 'DESC',
		keyWord,
		typeId
	}: IDictQueryString) {
		const query = this.createQueryBuilder('dict').where('typeId = :typeId', {
			typeId: parseInt(typeId, 10)
		})
		if (keyWord)
			query.andWhere('name LIKE :keyWord', { keyWord: '%' + keyWord + '%' })
		query.orderBy(sort, order)
		return await query.getMany()
	}
}

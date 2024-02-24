import { Resolve } from '@decorators'
import { IRequest, IResponse } from '@interfaces'
import { IDictTypeRequest } from './interface'
import { DictTypeRepository } from './repository'
import { BadRequest } from '@exceptions'

export class DictTypeController {
	/**
	 * @description 获取字典类型列表
	 * @param req
	 * @param res
	 */
	@Resolve()
	static async list(req: IRequest, res: IResponse) {
		const repository = new DictTypeRepository()
		const result = await repository.findBy({ isDel: false })
		res.locals.data = result
	}

	/**
	 * @description 创建字典类型
	 * @param req
	 * @param res
	 */
	@Resolve()
	static async create(req: IDictTypeRequest, res: IResponse) {
		const repository = new DictTypeRepository()
		const { name, key } = req.body

		const findDictType = await repository
			.createQueryBuilder('type')
			.where('type.name = :name', { name })
			.orWhere('type.key = :key', { key })
			.getOne()

		if (findDictType) {
			if (findDictType.name == name) throw new BadRequest('字典类型名已被使用')
			if (findDictType.key == key) throw new BadRequest('字典类型key已被使用')
		}

		const dictType = repository.create()
		dictType.name = name
		dictType.key = key
		const result = await repository.save(dictType)
		delete result.isDel
		res.locals.data = result
	}

	/**
	 * @description 更新字典类型
	 * @param req
	 * @param res
	 */
	@Resolve()
	static async update(req: IDictTypeRequest, res: IResponse) {
		const { name, key } = req.body
		const id = parseInt(req.params.id, 10)
		const repository = new DictTypeRepository()
		const findDictType = await repository.findOne({
			where: [{ name }, { key }]
		})

		if (findDictType && findDictType.id !== id) {
			if (findDictType.name == name) throw new BadRequest('字典类型名已被使用')
			if (findDictType.key == key) throw new BadRequest('字典类型key已被使用')
		}

		const dictType = await repository.findOneBy({ id })
		repository.merge(dictType, { name, key })
		const result = await repository.save(dictType)
		res.locals.data = result
	}

	/**
	 * @description 删除(逻辑删除)字典类型
	 * @param req
	 * @param res
	 */
	@Resolve()
	static async remove(req: IDictTypeRequest) {
		const id = parseInt(req.params.id, 10)
		const repository = new DictTypeRepository()
		await repository.update(id, { isDel: true })
	}
}

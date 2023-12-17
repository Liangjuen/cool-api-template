import { Resolve } from '@decorators'
import { IResponse } from '@interfaces'
import { IDictRequest } from './dict.interface'
import { DictRepository } from './dict.repository'
import { BadRequest } from '@exceptions'

export class DictController {
	/**
	 * @description 获取字典列表
	 * @param req
	 * @param res
	 */
	@Resolve()
	static async list(req: IDictRequest, res: IResponse) {
		const repository = new DictRepository()
		const result = await repository.list(req.query)
		res.locals.data = result
	}

	/**
	 * @description 获取字典详情
	 * @param req
	 * @param res
	 */
	@Resolve()
	static async get(req: IDictRequest, res: IResponse) {
		const id = parseInt(req.params.id, 10)
		const repository = new DictRepository()
		const result = await repository.findOneBy({ id })
		res.locals.data = result
	}

	/**
	 * @description 创建字典
	 * @param req
	 * @param res
	 */
	@Resolve()
	static async create(req: IDictRequest, res: IResponse) {
		const { name, typeId, value, orderNum, remark } = req.body
		const pId = req.body.pId == null ? null : parseInt(req.body.pId, 10)
		const repository = new DictRepository()
		const findDict = await repository.findOneBy({ name })
		if (findDict) throw new BadRequest('字典名已被占用')
		const dict = repository.create({
			typeId: parseInt(typeId, 10),
			orderNum: parseInt(orderNum, 10),
			pId,
			name,
			value,
			remark
		})
		const result = await repository.save(dict)
		res.locals.data = result
	}

	/**
	 * @description 更新字典
	 * @param req
	 * @param res
	 */
	@Resolve()
	static async update(req: IDictRequest, res: IResponse) {
		const { name, typeId, value, orderNum, remark } = req.body
		const pId = req.body.pId == null ? null : parseInt(req.body.pId, 10)
		const id = parseInt(req.params.id, 10)
		const repository = new DictRepository()

		const findDict = await repository.findOne({ where: { name } })

		if (findDict && findDict.id !== id) throw new BadRequest('字典名已被占用')
		const dict = await repository.findOneBy({ id })
		repository.merge(dict, {
			typeId: parseInt(typeId, 10),
			orderNum: parseInt(orderNum, 10),
			pId,
			name,
			value,
			remark
		})

		await repository.save(dict)
		res.locals.data = dict
	}

	/**
	 * @description 删除字典
	 * @param req
	 * @param res
	 */
	@Resolve()
	static async remove(req: IDictRequest) {
		const repository = new DictRepository()
		const ids = (req.params.ids as string).split(',').map(s => parseInt(s, 10))
		void (await repository.delete(ids))
	}
}

import { Resolve } from '@decorators'
import { IResponse } from '@interfaces'
import { IDepartmentRequest } from './department.interface'
import { DepartmentRepository } from './department.repository'
import { BadRequest } from '@exceptions'

export class DepartmentController {
	/**
	 * @description 获取部门信息
	 * @param req
	 * @param res
	 */
	@Resolve()
	static async list(req: IDepartmentRequest, res: IResponse) {
		const repository = new DepartmentRepository()
		res.locals.data = await repository.find()
	}

	/**
	 * @description 获取部门详情
	 * @param req
	 * @param res
	 */
	@Resolve()
	static async get(req: IDepartmentRequest, res: IResponse) {
		const id = parseInt(req.params.id, 10)
		const repository = new DepartmentRepository()
		res.locals.data = await repository.findOneBy({ id })
	}

	/**
	 * @description 创建部门
	 * @param req
	 * @param res
	 */
	@Resolve()
	static async create(req: IDepartmentRequest, res: IResponse) {
		const { name, orderNum } = req.body
		const pId = req.body.pId == null ? null : parseInt(req.body.pId + '', 10)
		const repo = new DepartmentRepository()
		const findDepart = await repo.findOneBy({ name })
		if (findDepart) throw new BadRequest('部门名已被占用')
		const department = repo.create({
			orderNum: parseInt(orderNum + '', 10),
			pId,
			name
		})
		res.locals.data = await repo.save(department)
	}

	/**
	 * @description 更新部门
	 * @param req
	 * @param res
	 */
	@Resolve()
	static async update(req: IDepartmentRequest, res: IResponse) {
		const { name, orderNum } = req.body
		const pId = req.body.pId == null ? null : parseInt(req.body.pId + '', 10)
		const id = parseInt(req.params.id, 10)
		const repo = new DepartmentRepository()
		const findDepart = await repo.findOneBy({ name })
		if (findDepart && findDepart.id !== id)
			throw new BadRequest('部门名已被占用')
		const department = await repo.findOneBy({ id })
		repo.merge(department, {
			orderNum: parseInt(orderNum + '', 10),
			pId,
			name
		})
		res.locals.data = await repo.save(department)
	}

	/**
	 * @description 删除部门
	 * @param req
	 */
	@Resolve()
	static async remove(req: IDepartmentRequest) {
		const repository = new DepartmentRepository()
		const ids = (req.params.ids as string).split(',').map(s => parseInt(s, 10))
		void (await repository.delete(ids))
	}
}

import { IRequest, IResponse } from '@interfaces'
import { Resolve } from '@decorators'
import { RoleRepository } from './role.repository'
import { IRoleRrequest } from './role.interface'
import { MenuRepository } from '@api/modules/base/menu/menu.repository'
import { BadRequest } from '@exceptions'

export class RoleController {
	/**
	 * @description 获取角色列表
	 * @param req
	 * @param res
	 */
	@Resolve()
	static async list(req: IRequest, res: IResponse) {
		const repository = new RoleRepository()
		const result = await repository.list(req.query)
		res.locals.data = result
	}

	/**
	 * @description 获取角色信息
	 * @param req
	 * @param res
	 */
	@Resolve()
	static async get(req: IRequest, res: IResponse) {
		const { id } = req.params
		const repository = new RoleRepository()
		res.locals.data = await repository.findOneBy({ id: parseInt(id, 10) })
	}

	/**
	 * @description 创建角色
	 * @param req
	 * @param res
	 */
	@Resolve()
	static async create(req: IRoleRrequest, res: IResponse) {
		const { name, code, remark, menuIdList } = req.body
		const repository = new RoleRepository()
		const findRole = await repository
			.createQueryBuilder('role')
			.where('role.name = :name', { name })
			.orWhere('role.code = :code', { code })
			.getOne()

		if (findRole) {
			if (findRole.name == name) throw new BadRequest('角色名已被占用')
			if (findRole.code == code) throw new BadRequest('角色编码已被占用')
		}

		const menuRepo = new MenuRepository()
		const { perms } = await menuRepo.getMenus(menuIdList)

		const newRole = repository.create({
			name,
			code,
			remark,
			menuIdList,
			perms
		})

		res.locals.data = await repository.save(newRole)
	}

	@Resolve()
	static async update(req: IRoleRrequest, res: IResponse) {
		const { name, code, menuIdList, remark } = req.body
		const id = parseInt(req.params.id, 10)
		const repository = new RoleRepository()

		const findRole = await repository.findOne({ where: [{ name }, { code }] })

		if (findRole && findRole.id !== id) {
			if (findRole.name == name) throw new BadRequest('角色名已被占用')
			if (findRole.code == code) throw new BadRequest('角色编码已被占用')
		}

		const role = await repository.findOneBy({ id })
		const menuRepo = new MenuRepository()
		const { perms } = await menuRepo.getMenus(menuIdList)
		repository.merge(role, {
			name,
			code,
			menuIdList,
			perms,
			remark
		})

		await repository.save(role)
		res.locals.data = await repository.save(role)
	}

	@Resolve()
	static async remove(req: IRoleRrequest) {
		const repository = new RoleRepository()
		const ids = (req.params.ids as string).split(',').map(s => parseInt(s, 10))
		void (await repository.delete(ids))
	}
}

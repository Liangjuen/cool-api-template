import { IResponse } from '@interfaces'
import { NotFound, BadRequest } from '@exceptions'
import { Resolve } from '@decorators'

import { MenuRepository } from './menu.repository'
import { IMenuRequest, MenuType } from './menu.type'

export class MenuController {
	/**
	 * @description 获取单个菜单
	 * @param req
	 * @param res
	 */
	@Resolve()
	static async get(req: IMenuRequest, res: IResponse) {
		const repository = new MenuRepository()
		const menu = await repository.findOneBy({ id: parseInt(req.params.id, 10) })
		if (!menu) {
			throw new NotFound('没有查询到相关菜单信息')
		}
		res.locals.data = menu
	}

	/**
	 * @description 获取菜单列表
	 * @param req
	 * @param res
	 */
	@Resolve()
	static async list(req: IMenuRequest, res: IResponse) {
		const {
			name,
			status,
			startDate,
			endDate,
			sort = 'sort',
			order = 'DESC'
		} = req.query
		const repository = new MenuRepository()
		const query = repository.createQueryBuilder('menu')

		if (name) {
			query.andWhere('name LIKE :name', {
				name: '%' + name + '%'
			})
		}

		if (status) query.andWhere('status = :status', { status })

		if (startDate && endDate) {
			query.andWhere('createdAt BETWEEN :startDate AND :endDate', {
				startDate,
				endDate
			})
		}

		query.orderBy(sort, order)

		res.locals.data = await query.getMany()
	}

	/**
	 * @description 创建菜单
	 * @param req
	 * @param res
	 */
	@Resolve()
	static async create(req: IMenuRequest, res: IResponse) {
		const {
			name,
			type,
			perms,
			component,
			icon,
			sort,
			cache,
			hidden,
			status,
			path
		} = req.body
		const pid = req.body.pid == null ? null : parseInt(req.body.pid, 10)
		const repository = new MenuRepository()
		const findDict = await repository.findOneBy({ name })
		if (findDict) throw new BadRequest('菜单名已被占用')
		const menu = repository.create({
			name,
			pid: type == MenuType.directory ? null : pid,
			type,
			perms: type == MenuType.permission ? perms : null,
			component: type == MenuType.permission ? null : component,
			icon: type == MenuType.permission ? null : icon,
			sort,
			cache,
			hidden,
			status,
			path
		})

		res.locals.data = await repository.save(menu)
	}

	/**
	 * @description 更新菜单
	 * @param req
	 * @param res
	 */
	@Resolve()
	static async update(req: IMenuRequest, res: IResponse) {
		const {
			name,
			type,
			perms,
			component,
			icon,
			sort,
			cache,
			hidden,
			status,
			path
		} = req.body
		const pid = req.body.pid == null ? null : parseInt(req.body.pid, 10)
		const id = parseInt(req.params.id, 10)
		const repository = new MenuRepository()
		const findMenu = await repository.findOne({ where: { name } })

		if (findMenu && findMenu.id !== id) throw new BadRequest('菜单名已被占用')
		const menu = await repository.findOneBy({ id })
		repository.merge(menu, {
			name,
			type,
			perms,
			component,
			icon,
			sort,
			cache,
			hidden,
			status,
			pid,
			path
		})
		res.locals.data = await repository.save(menu)
	}

	/**
	 * @description 删除菜单
	 * @param req
	 */
	@Resolve()
	static async remove(req: IMenuRequest) {
		const repository = new MenuRepository()
		const ids = (req.params.ids as string).split(',').map(s => parseInt(s, 10))
		void (await repository.delete(ids))
	}
}

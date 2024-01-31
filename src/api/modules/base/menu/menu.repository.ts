import { Repository, In } from 'typeorm'
import { Menu } from './menu.entity'
import { DateSource } from '@config'
import { MenuType } from './menu.type'

export class MenuRepository extends Repository<Menu> {
	constructor() {
		super(Menu, DateSource.createEntityManager())
	}

	/**
	 * @description 获取菜单(菜单、权限)列表
	 * @param menuIds
	 * @param isAdmin
	 * @returns
	 */
	async getMenus(menuIds: number[], isAdmin?: boolean) {
		let menus: Menu[]
		if (isAdmin) {
			menus = await this.find({
				order: {
					sort: 'ASC'
				}
			})
		} else {
			menus = await this.find({
				where: { id: In(menuIds) },
				order: {
					sort: 'ASC'
				}
			})
		}
		const permList = menus
			.filter(m => m.type == MenuType.permission)
			.map(p => p.perms)

		// 获取权限列表
		const perms: string[] = []
		permList.forEach(p => {
			perms.push(...p)
		})

		return {
			menus,
			perms: [...new Set(perms)]
		}
	}
}

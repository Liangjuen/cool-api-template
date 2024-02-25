import { CacheService } from '@services'
import { RoleRepository } from '@api/modules/base/role/role.repository'
import { Logger } from '@services'

export class RoleCache {
	static key = 'admin:perms'
	/**
	 * @description 角色列表缓存
	 * @param roles
	 */
	static async set() {
		try {
			const repository = new RoleRepository()
			const roles = await repository.find({
				select: ['perms', 'code', 'status']
			})
			const rolePerm = {}
			roles.forEach(r => {
				if (r.status == 1) rolePerm[r.code] = r.perms
			})
			const value = JSON.stringify(rolePerm)
			await CacheService.engine.set(RoleCache.key, value)
		} catch (error) {
			Logger.error(`role缓存错误: ${error}`, { context: 'RoleCache' })
		}
	}

	static async get(): Promise<{ [key: string]: string }[]> {
		const result = await CacheService.engine.get(RoleCache.key)
		return JSON.parse(result)
	}

	static async getOne(key: string): Promise<string> {
		const result = await CacheService.engine.get(RoleCache.key)
		const rolePerms = JSON.parse(result)
		return rolePerms[key]
	}
}

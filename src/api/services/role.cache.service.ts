import { CacheService } from '@services'
import { Role } from '@api/modules/base/role/role.entity'

export class RoleCache {
	static key = 'admin:perms'
	/**
	 * @description 设置多个角色信息
	 * @param roles
	 */
	static async set(roles: Role[]) {
		const rolePerm = {}
		roles.forEach(r => {
			rolePerm[r.code] = r.permissions
		})
		const value = JSON.stringify(rolePerm)
		await CacheService.engine.set(RoleCache.key, value)
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

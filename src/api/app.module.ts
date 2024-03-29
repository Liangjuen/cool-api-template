import { AppModule as Module } from '@classes'
import { Guard } from './middlewares'
import { RoleCache } from './services/role.cache.service'

import { UserRouter } from './modules/base/user/user.router'
import { DictRouter } from './modules/dict/info/dict.router'
import { DictTypeRouter } from './modules/dict/type/router'
import { LoginLogRouter } from './modules/loginLog/login-log.router'

import { AuthRouter } from './modules/auth/auth.router'
import { RoleRouter } from './modules/base/role/role.router'
import { MenuRouter } from './modules/base/menu/menu.router'
import { PermsRouter } from './modules/base/perms/perms.router'
import { DepartmentRouter } from './modules/base/department/department.router'
import { FileRouter } from './modules/common/file/file.router'
import { PersonRouter } from './modules/base/user/person/person.router'

export class AppModule extends Module {
	importAuth() {
		return [Guard.checkJwt]
	}

	plug = async () => {
		await RoleCache.set()
	}

	prevMiddles = () => []

	routes() {
		return [
			{ segment: '/v1/auth', provider: AuthRouter },
			{ segment: '/v1/users', auth: true, provider: UserRouter },
			{ segment: '/v1/roles', auth: true, provider: RoleRouter },
			{ segment: '/v1/menus', auth: true, provider: MenuRouter },
			{ segment: '/v1/perms', auth: true, provider: PermsRouter },
			{ segment: '/v1/departments', auth: true, provider: DepartmentRouter },
			{ segment: '/v1/dicts', auth: true, provider: DictRouter },
			{ segment: '/v1/files', provider: FileRouter },
			{ segment: '/v1/persons', auth: true, provider: PersonRouter },
			{
				segment: '/v1/dictTypes',
				auth: true,
				provider: DictTypeRouter
			},
			{
				segment: '/v1/loginLogs',
				auth: true,
				provider: LoginLogRouter
			}
		]
	}

	constructor() {
		super()
	}
}

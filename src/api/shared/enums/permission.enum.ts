import { list } from '@utils/enum'
export enum BasePermission {
	DepartmentList = 'base:department:list',
	DepartmentGet = 'base:department:get',
	DepartmentCreate = 'base:department:create',
	DepartmentUpdate = 'base:department:update',
	DepartmentRemove = 'base:department:remove',
	UserList = 'base:user:list',
	UserGet = 'base:user:get',
	UserCreate = 'base:user:create',
	UserUpdate = 'base:user:update',
	UserRemove = 'base:user:remove',
	RoleList = 'base:role:list',
	RoleGet = 'base:role:get',
	RoleCreate = 'base:role:create',
	RoleUpdate = 'base:role:update',
	RoleRemove = 'base:role:remove',
	MenuList = 'base:menu:list',
	MenuGet = 'base:menu:get',
	MenuCreate = 'base:menu:create',
	MenuUpdate = 'base:menu:update',
	MenuRemove = 'base:menu:remove',
	PermsList = 'base:perms:list'
}

export enum DictPermission {
	DictList = 'dict:info:list',
	DictGet = 'dict:info:get',
	DictCreate = 'dict:info:create',
	DictUpdate = 'dict:info:update',
	DictRemove = 'dict:info:remove',
	DictTypeList = 'dict:type:list',
	DictTypeCreate = 'dict:type:create',
	DictTypeUpdate = 'dict:type:update',
	DictTypeRemove = 'dict:type:remove'
}

export enum LogsPermission {
	LoginList = 'logs:login:list',
	LoginRemove = 'logs:login:remove',
	LoginClear = 'logs:login:clear',
	LoginExport = 'logs:login:export'
}

const permToList = (enms: Record<string, unknown>[]) => {
	const perms: string[] = []
	enms.forEach(e => {
		perms.push(...list(e))
	})
	return perms
}

export const perms = permToList([
	BasePermission,
	DictPermission,
	LogsPermission
])

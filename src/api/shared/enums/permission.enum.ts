import { list } from '@utils/enum'
export enum BasePermission {
	UserList = 'base:user:list',
	UserGet = 'base:user:get',
	UserCreate = 'base:user:create',
	UserUpdate = 'base:user:update',
	UserRemove = 'base:user:remove'
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
	LoginClear = 'logs:login:clear'
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

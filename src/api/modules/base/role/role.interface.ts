import { Request } from 'express'
import { Role } from './role.entity'
import { IRequestQuery, IRequestParams, IBaseEntity } from '@shared/interfaces'
import { Status } from '@shared/enums'

export interface IRoleQuery extends IRequestQuery {
	name?: string
	code?: string
	status?: Status
}

export interface IRoleRrequest
	extends Request<
		IRequestParams,
		any,
		Omit<Role, keyof IBaseEntity>,
		IRoleQuery
	> {}

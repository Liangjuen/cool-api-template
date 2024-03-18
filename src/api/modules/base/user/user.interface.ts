import { Request } from 'express'
import { User } from './user.entity'
import { IRequestParams, IRequestQuery } from '@shared/interfaces'
import { Status, Gender } from '@shared/enums'

export interface IUserQuery extends IRequestQuery {
	status?: Status
	username?: string
	email?: string
	role?: string
	gender?: Gender
	departmentIds?: number[]
}

/**
 * @description 用户请求参数模型
 */
export interface IUserRequest
	extends Request<
		IRequestParams,
		any,
		{
			username?: string
			email?: string
			password?: string
			oldPassword?: string
		},
		IUserQuery
	> {
	user?: User | Record<string, unknown>
}

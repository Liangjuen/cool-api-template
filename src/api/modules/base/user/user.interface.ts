import { Request } from 'express'
import { User } from './user.entity'
import { IRequestParams, IRequestQuery, JwtPayload } from '@shared/interfaces'
import { Status, Gender } from '@shared/enums'

export interface IUserQuery extends IRequestQuery {
	status?: Status
	keyword?: string
	email?: string
	role?: string
	gender?: Gender
	departmentIds?: string
}

/**
 * @description 用户请求参数模型
 */
export interface IUserRequest
	extends Request<
		IRequestParams,
		any,
		Partial<User> & {
			departmentId?: string
			password?: string
			oldPassword?: string
		},
		IUserQuery
	> {
	user?: JwtPayload
}

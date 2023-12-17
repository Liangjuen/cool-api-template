import { User } from './user.entity'
import { IRequest } from '@interfaces'
import { IQueryString } from '@shared/interfaces'
import { Status, Gender } from '@shared/enums'

export interface IUserQueryString extends IQueryString {
	status?: Status
	username?: string
	email?: string
	role?: string
	gender?: Gender
}

/**
 * @description
 */
export interface IUserRequest extends IRequest {
	user?: User | Record<string, unknown>
	logIn: (user: User, done: (err: any) => void) => void
	query: {
		page?: string
		size?: string
		startDate?: string
		endDate?: string
	}
	params: {
		id?: string
		ids?: string
	}
	body: {
		username?: string
		email?: string
		password?: string
		oldPassword?: string
	}
}

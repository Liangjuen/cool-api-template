import { IRequest } from '@interfaces'
import { IQueryString } from '@shared/interfaces'
import { LoginState } from './login-log.enum'

export interface ILoginLogQueryString extends IQueryString {
	state?: LoginState
	username?: string
	ip?: string
}

export interface ILoginLogRequest extends IRequest {
	query: {
		page?: string
		size?: string
		startDate?: string
		endDate?: string
	}
	params: {
		ids?: string
	}
}

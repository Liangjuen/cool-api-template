import { IQueryString } from '@shared/interfaces'
import { IRequest } from '@core/interfaces'
import { Status } from '@shared/enums'

export interface IRoleQueryString extends IQueryString {
	name?: string
	code?: string
	status?: string
}

export interface IRoleRrequest extends IRequest {
	query: {
		name?: string
		code?: string
		status?: string
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
		perms: string[]
		name: string
		code: string
		remark?: string
		status: Status
	}
}

import { IRequest as CRequest } from '@interfaces'

export interface JwtPayload {
	username: string
	id: number
	email: string
	roles: string
	[key: string]: any
}

export interface IRequest extends CRequest<JwtPayload> {}

export interface IRequestQuery {
	page?: string | number
	size?: string | number
	startDate?: Date
	endDate?: Date
	order?: 'DESC' | 'ASC'
	sort?: string
}

export interface IRequestParams {
	id?: string
	ids?: string
}

import { IRequest } from '@interfaces'
import { IQueryString } from '@shared/interfaces'

export interface IDictQueryString extends IQueryString {
	keyWord?: string
	typeId?: string
}

export interface IDictRequest extends IRequest {
	query: {
		keyWord?: string
		sort?: string
		order?: 'DESC' | 'ASC'
		typeId?: string
	}
	params: {
		ids?: string
		id?: string
	}
	body: {
		name?: string
		typeId?: string
		value?: string
		orderNum?: string
		remark?: string
		pId?: string
	}
}

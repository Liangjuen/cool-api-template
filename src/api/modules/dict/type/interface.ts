import { IRequest } from '@interfaces'

export interface IDictTypeRequest extends IRequest {
	params: {
		id?: string
	}
	body: {
		name?: string
		key?: string
	}
}

import { Request } from 'express'
import { IRequestQuery, IRequestParams } from '@shared/interfaces'

export interface IDictQuery extends IRequestQuery {
	keyword?: string
	typeId?: string
}

export interface IDictRequest
	extends Request<
		IRequestParams,
		any,
		{
			name?: string
			typeId?: string
			value?: string
			orderNum?: string
			remark?: string
			pId?: string
		},
		IDictQuery
	> {}

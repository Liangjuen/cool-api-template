import { Response } from 'express'
import { IEntity } from './entity'
import { APICode, APIMessage } from '@enums'

interface IResponseData {
	code: APICode
	msg: string | APIMessage
	data?:
		| Record<string, unknown>
		| Array<Record<string, unknown>>
		| IEntity
		| IEntity[]
	meta?: {
		total: number
		current?: number
		size?: number
	}
}

/**
 * @description — Express 派生响应对象
 */
export interface IResponse extends Response<any, IResponseData> {}

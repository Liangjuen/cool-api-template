import { type IEntity } from './entity'
import { type APICode, type APIMessage } from '@enums'

export interface IResponse extends Response {
	locals: {
		code: APICode
		msg: string | APIMessage
		data?:
			| Record<string, unknown>
			| Array<Record<string, unknown>>
			| IEntity
			| IEntity[]
		meta?: {
			total: number
			pagination?: {
				current?: number
				size?: number
			}
		}
	}
}

import { Request } from 'express'
import { IRequestParams, IBaseEntity } from '@shared/interfaces'
import { DictType } from './type.entity'

export interface IDictTypeRequest
	extends Request<IRequestParams, any, Omit<DictType, keyof IBaseEntity>> {}

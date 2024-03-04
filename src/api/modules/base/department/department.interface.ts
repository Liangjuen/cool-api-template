import { Request } from 'express'
import { IRequestParams, IBaseEntity } from '@shared/interfaces'
import { Department } from './department.entity'

export interface IDepartmentRequest
	extends Request<IRequestParams, any, Omit<Department, keyof IBaseEntity>> {}

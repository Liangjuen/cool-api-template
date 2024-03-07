import Joi from 'joi'
import { name } from './department.schemas'
import { id, orderNum, pId } from '@shared/schemas'
import { remove } from '@shared/validations'

export const get = {
	params: Joi.object({
		id: id()
	})
}

export const create = {
	body: Joi.object({
		name: name()
			.required()
			.messages({ 'string.required': '字典类型名为必填项' }),
		orderNum: orderNum(),
		pId: pId()
	})
}

export const update = {
	params: Joi.object({
		id: id().required()
	}),
	body: Joi.object({
		name: name()
			.required()
			.messages({ 'string.required': '字典类型名为必填项' }),
		orderNum: orderNum(),
		pId: pId()
	})
}

export { remove }

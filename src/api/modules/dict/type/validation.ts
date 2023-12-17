import Joi from 'joi'
import { name, key } from './schemas'
import { id } from '@shared/schemas'

export const create = {
	body: Joi.object({
		name: name()
			.required()
			.messages({ 'string.required': '字典类型名为必填项' }),
		key: key().required().messages({ 'string.required': '字典类型key为必填项' })
	})
}

export const update = {
	params: Joi.object({
		id: id().required()
	}),
	body: Joi.object({
		name: name(),
		key: key()
	})
}

export const remove = {
	params: Joi.object({
		id: id().required()
	})
}

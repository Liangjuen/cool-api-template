import Joi from 'joi'
import { typeId, name, value, remark } from './dict.schemas'
import { id, pId, sort, order, keyword, orderNum } from '@shared/schemas'
import { remove } from '@shared/validations'

const get = {
	params: Joi.object({
		id: id()
	})
}

const list = {
	query: Joi.object({
		typeId: typeId().required(),
		keyword: keyword(),
		sort: sort(),
		order: order()
	})
}

const create = {
	body: Joi.object({
		name: name().required(),
		typeId: typeId().required(),
		value: value().required(),
		orderNum: orderNum(),
		remark: remark(),
		pId: pId()
	})
}

const update = {
	params: Joi.object({
		id: id()
	}),
	body: Joi.object({
		name: name(),
		typeId: typeId(),
		value: value(),
		orderNum: orderNum(),
		remark: remark(),
		pId: pId()
	})
}

export { get, list, create, update, remove }

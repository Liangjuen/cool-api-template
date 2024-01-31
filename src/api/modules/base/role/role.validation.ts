import Joi from 'joi'
import { code, name, remark, menuIdList } from './role.schemas'
import { id, sort, order, status } from '@shared/schemas'
import { remove } from '@shared/validations'

const get = {
	params: Joi.object({
		id: id().required()
	})
}

const list = {
	query: Joi.object({
		code: code(),
		name: name(),
		status: status(),
		sort: sort(),
		order: order()
	})
}

const create = {
	body: Joi.object({
		name: name().required(),
		code: code().required(),
		status: status().required(),
		remark: remark(),
		menuIdList: menuIdList()
	})
}

const update = {
	params: Joi.object({
		id: id()
	}),
	body: Joi.object({
		name: name(),
		code: code(),
		status: status(),
		remark: remark(),
		menuIdList: menuIdList()
	})
}

export { get, list, create, update, remove }

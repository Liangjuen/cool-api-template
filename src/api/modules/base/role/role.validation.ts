import Joi from 'joi'
import { code, name, remark, menuIdList } from './role.schemas'
import { id, sort, order, status, keyword, pagination } from '@shared/schemas'
import { remove } from '@shared/validations'

const get = {
	params: Joi.object({
		id: id().required()
	})
}

const list = {
	query: Joi.object({
		keyword: keyword(),
		page: pagination('page'),
		size: pagination('size'),
		sort: sort(),
		order: order()
	})
}

const create = {
	body: Joi.object({
		name: name().required(),
		code: code().required(),
		remark: remark(),
		menuIdList: menuIdList()
	})
}

const update = {
	params: Joi.object({
		id: id()
	}),
	body: Joi.object({
		name: name().required(),
		code: code().required(),
		status: status(),
		remark: remark(),
		menuIdList: menuIdList()
	})
}

export { get, list, create, update, remove }

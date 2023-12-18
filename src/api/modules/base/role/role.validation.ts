import Joi from 'joi'
import { code, name, remark, perms } from './role.schemas'
import { id, sort, order, status } from '@shared/schemas'
import { remove } from '@shared/validations'

const get = {
	params: Joi.object({
		id: id()
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
		name: name(),
		code: code(),
		status: status(),
		remark: remark(),
		perms: perms()
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
		perms: perms()
	})
}

export { get, list, create, update, remove }

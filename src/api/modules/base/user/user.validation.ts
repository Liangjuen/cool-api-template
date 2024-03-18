import Joi from 'joi'
import { remove } from '@shared/validations'

import {
	id,
	ids,
	email,
	role,
	pagination,
	startDate,
	endDate,
	remark
} from '@shared/schemas'
import {
	password,
	username,
	status,
	gender,
	tags,
	roles,
	avatar
} from './user.schemas'

const get = {
	params: Joi.object({
		id: id()
	})
}

const list = {
	query: Joi.object({
		page: pagination('page'),
		size: pagination('size'),
		username: Joi.any(),
		role: role(),
		gender: gender(),
		status: status(),
		startDate: startDate(),
		endDate: endDate(),
		departmentIds: ids().allow(null).required()
	})
}

const create = {
	body: Joi.object({
		username: username().required(),
		email: email().required(),
		password: password().required(),
		role: role(),
		gender: gender()
	})
}

const update = {
	params: Joi.object({
		id: id()
	}),
	body: Joi.object({
		username: username(),
		password: password(),
		oldPassword: password(),
		roles: roles(),
		gender: gender(),
		remark: remark(),
		tags: tags(),
		avatar: avatar()
	})
}

export { get, list, create, update, remove }

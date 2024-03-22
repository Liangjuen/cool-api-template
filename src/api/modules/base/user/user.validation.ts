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
	remark,
	keyword
} from '@shared/schemas'
import {
	password,
	username,
	status,
	gender,
	tags,
	roles,
	avatar,
	name,
	nickName,
	phone
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
		keyword: keyword(),
		role: role(),
		gender: gender(),
		status: status(),
		startDate: startDate(),
		endDate: endDate(),
		departmentIds: ids().allow(null, '').required()
	})
}

const create = {
	body: Joi.object({
		username: username().required(),
		name: name(),
		nickName: nickName(),
		email: email().allow(null, ''),
		phone: phone().allow(null, ''),
		roles: roles().required(),
		status: status(),
		gender: gender(),
		remark: remark().allow(null, ''),
		tags: tags().allow(null, ''),
		avatar: avatar().allow(null, ''),
		departmentId: id().required()
	})
}

const update = {
	params: Joi.object({
		id: id()
	}),
	body: Joi.object({
		username: username(),
		name: name(),
		nickName: nickName(),
		email: email().allow(null, ''),
		phone: phone().allow(null, ''),
		status: status(),
		password: password(),
		roles: roles(),
		gender: gender(),
		remark: remark().allow(null, ''),
		tags: tags().allow(null, ''),
		avatar: avatar().allow(null, ''),
		departmentId: id()
	})
}

const resetPass = {
	params: Joi.object({
		id: id().required()
	}),
	body: Joi.object({
		password: password().required()
	})
}

export { get, list, create, update, remove, resetPass }

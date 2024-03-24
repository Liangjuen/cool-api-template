import Joi from 'joi'
import { id, email, remark } from '@shared/schemas'

import {
	password,
	username,
	status,
	gender,
	tags,
	avatar,
	name,
	nickName,
	phone
} from '../user.schemas'

const get = {
	params: Joi.object({
		id: id()
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
		gender: gender(),
		remark: remark().allow(null, ''),
		tags: tags().allow(null, ''),
		avatar: avatar().allow(null, '')
	})
}

const updatePassword = {
	params: Joi.object({
		id: id()
	}),
	body: Joi.object({
		oldPassword: password().required(),
		password: password().required()
	})
}

export { get, update, updatePassword }

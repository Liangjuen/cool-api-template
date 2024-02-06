import Joi from 'joi'
import { remove } from '@shared/validations'
import { id, order, status, startDate, endDate, pId } from '@shared/schemas'
import {
	name,
	perms,
	type,
	component,
	icon,
	cache,
	hidden,
	path,
	sort
} from './menu.schemas'

const body = Joi.object({
	pid: pId(),
	name: name().required(),
	type: type().required(),
	perms: perms(),
	component: component(),
	path: path(),
	icon: icon(),
	sort: sort(),
	cache: cache(),
	hidden: hidden(),
	status: status()
})

const get = {
	params: Joi.object({
		id: id().required()
	})
}

const list = {
	query: Joi.object({
		name: name(),
		status: status(),
		stratDate: startDate(),
		endDate: endDate(),
		sort: sort(),
		order: order()
	})
}

const create = {
	body
}

const update = {
	params: Joi.object({
		id: id()
	}),
	body
}

export { get, list, create, update, remove }

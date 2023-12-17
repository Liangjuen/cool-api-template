import Joi from 'joi'

import { remove } from '@shared/validations'

import { pagination, startDate, endDate } from '@shared/schemas'
import { ip, state } from './login-log.schenas'

const list = {
	query: Joi.object({
		page: pagination('page'),
		size: pagination('size'),
		username: Joi.any(),
		state: state(),
		ip: ip(),
		startDate: startDate(),
		endDate: endDate()
	})
}

export { list, remove }

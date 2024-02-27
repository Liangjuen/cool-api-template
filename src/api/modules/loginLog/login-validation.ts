import Joi from 'joi'

import { remove } from '@shared/validations'

import { pagination, startDate, endDate, keyword } from '@shared/schemas'
import { state } from './login-log.schenas'

const list = {
	query: Joi.object({
		page: pagination('page'),
		size: pagination('size'),
		keyword: keyword(),
		state: state(),
		startDate: startDate(),
		endDate: endDate()
	})
}

export { list, remove }

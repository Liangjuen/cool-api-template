import Joi from 'joi'

import { ids } from '../schemas'

const remove = {
	params: Joi.object({
		ids: ids().required()
	})
}

export { remove }

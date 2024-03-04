import Joi from 'joi'

const name = () =>
	Joi.string().max(12).messages({ 'string.max': '部门名长度不超过 12 位' })

export { name }

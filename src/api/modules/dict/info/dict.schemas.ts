import Joi from 'joi'

const name = () =>
	Joi.string().max(24).messages({ 'string.max': '字典名长度不超过 24 位' })

const orderNum = () => Joi.number().integer()

const value = () =>
	Joi.string()
		.allow('', null)
		.max(500)
		.messages({ 'string.max': '字典值长度规定不超过 500' })

const typeId = () => Joi.number().integer()

const remark = () =>
	Joi.string()
		.allow('', null)
		.max(200)
		.messages({ 'string.max': '字典描述度规定不超过 200' })

export { name, orderNum, value, typeId, remark }

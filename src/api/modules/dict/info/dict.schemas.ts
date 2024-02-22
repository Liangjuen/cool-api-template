import Joi from 'joi'

const name = () =>
	Joi.string().max(24).messages({ 'string.max': '字典名长度不超过 24 位' })

const orderNum = () => Joi.number().integer()

const value = () =>
	Joi.string().max(256).messages({ 'string.max': '字典值长度规定不超过 256' })

const typeId = () => Joi.number().integer()

const remark = () =>
	Joi.string().max(500).messages({ 'string.max': '字典描述度规定不超过 500' })

export { name, orderNum, value, typeId, remark }

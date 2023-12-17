import Joi from 'joi'

const name = () =>
	Joi.string().max(24).messages({ 'string.max': '字典名长度不超过 24 位' })

const orderNum = () => Joi.number().integer()

const value = () =>
	Joi.string().max(256).messages({ 'string.max': '字典值长度规定不超过 256' })

const typeId = () => Joi.number().integer()

const remark = () =>
	Joi.string().max(500).messages({ 'string.max': '字典描述度规定不超过 500' })

const keyWord = () =>
	Joi.string().max(20).messages({ 'string.max': '搜索关键词不得超过 20 字' })

export { name, orderNum, value, typeId, remark, keyWord }

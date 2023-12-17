import Joi from 'joi'

const name = () =>
	Joi.string().max(24).messages({
		'string.max': '字典类型名长度不超过 24 位'
	})

const isDel = () => Joi.boolean()

const key = () =>
	Joi.string()
		.regex(/^[_A-Za-z0-9]/)
		.messages({
			'string.pattern.base': '字典类型key推荐使用字母、下划线、数字及其组合组成'
		})

export { name, isDel, key }

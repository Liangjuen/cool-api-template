import Joi from 'joi'

const name = () =>
	Joi.string().max(18).messages({ 'string.max': '角色名长度不超过 18 位' })

const code = () =>
	Joi.string()
		.max(20)
		.messages({ 'string.max': '角色编码长度不超过 20 位' })
		.regex(/^[a-zA-Z]+$/)
		.messages({ 'string.pattern.base': '角色编码请使用英文' })

const remark = () =>
	Joi.string()
		.allow('', null)
		.max(200)
		.messages({ 'string.max': '字典描述度规定不超过 200' })

const menuIdList = () =>
	Joi.array()
		.allow(null)
		.items(Joi.number().min(1).max(64))
		.messages({ 'array.base': '权限列表未通过校验' })

export { name, code, remark, menuIdList }

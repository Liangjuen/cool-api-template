import Joi from 'joi'
import { list } from '@utils/enum'
import { MenuType, MenuCache, MenuHidden } from './menu.type'

const name = () =>
	Joi.string().max(8).messages({ 'string.max': '节点名称长度不超过 8 位' })

const perms = () => Joi.array().allow(null).items(Joi.string())

const type = () => Joi.number().valid(...list(MenuType))

const component = () =>
	Joi.string()
		.allow(null, '')
		.max(100)
		.messages({ 'string.max': '组件路径长度超出限制' })

const icon = () =>
	Joi.string()
		.allow(null, '')
		.max(20)
		.messages({ 'string.max': '图标名称长度不超过 20 位' })

const cache = () => Joi.number().valid(...list(MenuCache))

const hidden = () => Joi.number().valid(...list(MenuHidden))

const path = () =>
	Joi.string()
		.allow(null, '')
		.max(30)
		.messages({ 'string.max': '节点路由长度不超过 30 位' })

const sort = () => Joi.number()

export { name, perms, type, component, icon, cache, hidden, path, sort }

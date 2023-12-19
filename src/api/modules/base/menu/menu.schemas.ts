import Joi from 'joi'
import { list } from '@utils/enum'
import { MenuType, MenuCache, MenuHidden } from './menu.type'

const name = () =>
	Joi.string().max(18).messages({ 'string.max': '角色名长度不超过 18 位' })

const permission = () =>
	Joi.string()
		.regex(/^[a-zA-Z]+$/)
		.messages({ 'string.pattern.base': '权限限制为英文' })

const type = () => Joi.number().valid(...list(MenuType))

const component = () => Joi.string().max(30)

const icon = () => Joi.string().max(20)

const cache = () => Joi.number().valid(...list(MenuCache))

const hidden = () => Joi.number().valid(...list(MenuHidden))

export { name, permission, type, component, icon, cache, hidden }

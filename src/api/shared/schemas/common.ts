import Joi, { AnySchema } from 'joi'
import { list } from '@utils/enum'
import { Status } from '../enums'

const id = (): AnySchema => {
	return Joi.number().integer()
}

const email = (): AnySchema => {
	return Joi.string().email().messages({
		'string.empty': '邮箱为必填项',
		'string.email': '邮箱格式错误'
	})
}

const role = (): AnySchema => {
	return Joi.any()
}

const pagination = (key: string): AnySchema => {
	const pagination = {
		page: Joi.number().integer().min(1).messages({
			'number.min': '[page] 必须大于等于1',
			'number.integer': '[page] 必须为自然数',
			'number.base': '[page] 必须为数字类型'
		}),

		size: Joi.number().min(1).max(100).messages({
			'number.min': '[size] 必须大于等于1',
			'number.max': '[size] 必须小于等于100',
			'number.integer': '[size] 必须为自然数',
			'number.base': '[size] 必须为数字类型'
		})
	}
	return pagination[key] as AnySchema
}

const startDate = (): AnySchema =>
	Joi.date().messages({
		'date.base': '[startDate] 格式不对'
	})

const endDate = (): AnySchema =>
	Joi.date().messages({
		'date.base': '[endDate] 格式不对'
	})

const description = (): AnySchema =>
	Joi.string().max(120).messages({
		'string.max': '描述信息不超过 120 字'
	})

const ids = (): AnySchema =>
	Joi.string()
		.regex(/^\d+(,\d+)*$/)
		.message('ID序列格式错误')

const status = (): AnySchema => {
	return Joi.number().valid(...list(Status))
}

const keyWord = () =>
	Joi.string().max(20).messages({ 'string.max': '搜索关键词不得超过 20 字' })

const order = () => Joi.string().valid('ASC', 'DESC')

const sort = () =>
	Joi.string().max(20).messages({ 'string.max': '排序字段不得超过 20' })

const pId = () => Joi.number().integer().allow(null)

export {
	id,
	email,
	role,
	pagination,
	startDate,
	endDate,
	description,
	ids,
	status,
	keyWord,
	order,
	sort,
	pId
}

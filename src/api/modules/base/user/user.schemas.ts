import Joi, { AnySchema } from 'joi'
import { Status, Gender } from '@shared/enums'
import { list } from '@utils/enum'

const password = (): AnySchema => {
	return Joi.string()
		.regex(/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{8,16}$/)
		.messages({
			'string.pattern.base':
				'密码必须是字母、数字、特殊字符及其组合,长度为8-16位',
			'string.empty': '密码为必填'
		})
}

// 用户名由汉字或字母开头,由3-16位数字,字母,汉字组成
const username = (): AnySchema => {
	return Joi.string()
		.regex(/^[\u4E00-\u9FA5_A-Za-z0-9]{3,16}/)
		.messages({
			'string.pattern.base':
				'用户名必须是字母、汉字、下划线、数字及其组合,长度为3-16位'
		})
}

const name = (): AnySchema => {
	return Joi.string().max(20).messages({
		'string.max': '姓名限制20位'
	})
}

const nickName = (): AnySchema => {
	return Joi.string().max(10).messages({
		'string.max': '姓名限制10位'
	})
}

const status = (): AnySchema => {
	return Joi.number().valid(...list(Status))
}

const gender = (): AnySchema =>
	Joi.number()
		.valid(...list(Gender))
		.messages({
			'any.only': '性别校验未通过'
		})

const avatar = (): AnySchema =>
	Joi.string()
		.regex(/^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg))$/i)
		.messages({
			'string.pattern.base':
				'头像地址格式错误，支持格式[gif|png|jpg|jpeg|webp|svg]'
		})

const tags = (): AnySchema =>
	Joi.array().allow(null).max(10).items(Joi.string().min(1).max(16)).messages({
		'array.base': '标签未通过校验'
	})

const roles = (): AnySchema => Joi.array().items(Joi.string())

const phone = (): AnySchema =>
	Joi.string().regex(/^(?:(?:\+|00)86)?1[3-9]\d{9}$/)

export {
	password,
	username,
	status,
	gender,
	avatar,
	tags,
	roles,
	name,
	nickName,
	phone
}

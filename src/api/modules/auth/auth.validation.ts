import Joi from 'joi'

import { email } from '@shared/schemas'
import { password, username } from '../base/user/user.schemas'

const authEmail = () =>
	email().required().messages({ 'string.required': '邮箱不能为空' })
const authUsername = () =>
	username().required().messages({ 'string.required': '用户名不能为空' })
const authPassword = () =>
	password().required().messages({ 'string.required': '密码不能为空' })

const login = {
	body: Joi.object({
		email: authEmail(),
		password: authPassword()
	})
}

const register = {
	body: Joi.object({
		email: authEmail(),
		password: authPassword(),
		username: authUsername()
	})
}

export { login, register }

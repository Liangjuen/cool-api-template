import Joi, { AnySchema } from 'joi'
import { list } from '@utils/enum'
import { LoginState } from './login-log.enum'

const ip = (): AnySchema => {
	return Joi.string().ip().messages({
		'string.ip': '请输入合法 IP'
	})
}

const state = (): AnySchema => {
	return Joi.number().valid(...list(LoginState))
}

export { ip, state }

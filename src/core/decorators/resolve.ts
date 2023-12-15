import { NextFunction } from 'express'
import { IResponse, IRequest } from '@interfaces'
import { APICode, APIMessage } from '@enums'

/**
 * @decorator Resolve
 *
 * @description 用于捕获执行时触发的错误和挂载初始化信息(code = 1, msg = 'success')
 * @returns
 */
export const Resolve = (): MethodDecorator =>
	((target: object, key: string | symbol) => {
		const method = target[key] as (
			req: IRequest,
			res: IResponse,
			next: NextFunction
		) => Promise<void> | void

		target[key] = function (...args: any[]): void {
			const res = args[1] as IResponse
			const next = args[2] as NextFunction

			// 获取 controller 执行结果
			const result = method.apply(this, args) as Promise<void> | void

			// 异步处理
			if (result && result instanceof Promise) {
				result
					.then(() => {
						/**
						 * 在此挂载成功时的信息
						 */
						const { code, msg } = res.locals

						// 没有指定 code 使用此默认配置
						if (!code && code != APICode.failed)
							res.locals.code = code ? code : APICode.success

						// 没有指定 data 使用此默认配置
						if (res.locals.data == undefined) res.locals.data = null

						// 没有指定 msg 使用此默认配置
						res.locals.msg = msg ? msg : APIMessage.success

						next()
					})
					.catch(next)
			}
		}

		return target[key] as (
			req: IRequest,
			res: IResponse,
			next: NextFunction
		) => Promise<void> | void
	}) as MethodDecorator

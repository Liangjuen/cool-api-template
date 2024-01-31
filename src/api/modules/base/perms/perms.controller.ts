import { IRequest, IResponse } from '@interfaces'
import { Resolve } from '@decorators'
import { perms } from '@shared/enums/permission.enum'

export class PermsController {
	/**
	 * @description 获取权限列表
	 * @param req
	 * @param res
	 */
	@Resolve()
	static async list(req: IRequest, res: IResponse) {
		res.locals.data = perms as any
	}
}

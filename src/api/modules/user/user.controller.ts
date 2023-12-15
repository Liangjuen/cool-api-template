import { IRequest, IResponse } from '@interfaces'

import { Resolve } from '@decorators'

export class UserController {
	@Resolve()
	static async list(req: IRequest, res: IResponse) {
		res.locals.data = []
	}

	@Resolve()
	static async get(req: IRequest, res: IResponse) {
		res.locals.data = {}
	}
}

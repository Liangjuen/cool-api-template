import { IRequest, IResponse } from '@interfaces'
import { Resolve } from '@decorators'
import { UserRepository } from '../user.repository'

export class PersonService {
	@Resolve()
	async get(req: IRequest, res: IResponse) {
		const repository = new UserRepository()
		res.locals.data = await repository.one(parseInt(req.user.id, 10))
	}

	@Resolve()
	async update(req: IRequest, res: IResponse) {
		const repository = new UserRepository()
		const person = await repository.findOneBy({
			id: parseInt(req.user.id, 10)
		})
		const newPerson = repository.merge(person, req.body)
		res.locals.data = await repository.save(newPerson)
	}

	@Resolve()
	async updatePassword(req: IRequest, res: IResponse) {
		res.locals.data = {}
	}
}

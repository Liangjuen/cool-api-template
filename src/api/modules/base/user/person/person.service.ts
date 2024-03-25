import { IResponse } from '@api/shared/interfaces'
import { Resolve } from '@decorators'
import { BadRequest } from '@exceptions'
import { UserRepository } from '../user.repository'
import { IUserRequest } from '../user.interface'

export class PersonService {
	@Resolve()
	async get(req: IUserRequest, res: IResponse) {
		const repository = new UserRepository()
		res.locals.data = await repository.one(req.user.id)
	}

	@Resolve()
	async update(req: IUserRequest, res: IResponse) {
		const repository = new UserRepository()
		const { username, phone, email, nickName } = req.body
		const { id } = req.user

		await repository.checkIfFieldsExist({
			username,
			phone,
			email,
			nickName,
			id
		})

		const person = await repository.findOneBy({
			id: req.user.id
		})

		const newPerson = repository.merge(person, req.body)
		res.locals.data = await repository.save(newPerson)
	}

	@Resolve()
	async updatePassword(req: IUserRequest, res: IResponse) {
		const repository = new UserRepository()
		const person = await repository
			.createQueryBuilder('person')
			.addSelect('person.password')
			.where({ id: req.user.id })
			.getOne()

		const flog = await person.passwordMatches(req.body.oldPassword)

		if (!flog) throw new BadRequest('旧密码错误')

		const newPerson = repository.merge(person, { password: req.body.password })

		await newPerson.hashPassword()

		res.locals.data = await repository.save(newPerson)
	}
}

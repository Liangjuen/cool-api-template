import { Repository } from 'typeorm'
import { DateSource } from '@config'
import { User } from './user.entity'

export class UserRepository extends Repository<User> {
	constructor() {
		super(User, DateSource.createEntityManager())
	}
}

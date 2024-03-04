import { Repository } from 'typeorm'
import { DateSource } from '@config'
import { Department } from './department.entity'

export class DepartmentRepository extends Repository<Department> {
	constructor() {
		super(Department, DateSource.createEntityManager())
	}
}

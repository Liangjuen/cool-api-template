import { Repository } from 'typeorm'
import { DateSource } from '@config'
import { DictType } from './type.entity'

export class DictTypeRepository extends Repository<DictType> {
	constructor() {
		super(DictType, DateSource.createEntityManager())
	}
}

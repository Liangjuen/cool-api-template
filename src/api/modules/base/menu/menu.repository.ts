import { Repository } from 'typeorm'
import { Menu } from './menu.entity'
import { DateSource } from '@config'

export class MenuRepository extends Repository<Menu> {
	constructor() {
		super(Menu, DateSource.createEntityManager())
	}
}

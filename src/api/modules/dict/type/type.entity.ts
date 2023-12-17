import { Entity, Column } from 'typeorm'
import { IEntity } from '@interfaces'
import { BaseEntity } from '@classes'

@Entity()
export class DictType extends BaseEntity implements IEntity {
	@Column({ unique: true })
	name: string

	@Column({ unique: true })
	key: string

	@Column({
		type: 'boolean',
		default: false,
		select: false
	})
	isDel: boolean
}

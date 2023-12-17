import { Entity, Column } from 'typeorm'

import { IEntity } from '@interfaces'
import { BaseEntity } from '@classes'
import { Status } from '@shared/enums'

@Entity()
export class Role extends BaseEntity implements IEntity {
	@Column({ unique: true })
	name: string

	@Column({ unique: true })
	code: string

	@Column({ type: 'simple-array' })
	permissions: number[]

	@Column({ type: 'simple-array', default: null })
	menus: number[]

	@Column({ default: '' })
	description?: string

	@Column({
		type: 'enum',
		enum: Status,
		default: Status.normal
	})
	status: Status
}

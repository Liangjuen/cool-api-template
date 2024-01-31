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
	menuIdList: number[]

	@Column({ type: 'simple-array' })
	perms: string[]

	@Column({ default: '' })
	remark?: string

	@Column({
		type: 'enum',
		enum: Status,
		default: Status.normal
	})
	status: Status
}

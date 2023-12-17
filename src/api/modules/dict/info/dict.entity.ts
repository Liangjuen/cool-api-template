import { Entity, Column } from 'typeorm'
import { IEntity } from '@interfaces'
import { BaseEntity } from '@classes'
import { Status } from '@shared/enums'

@Entity()
export class Dict extends BaseEntity implements IEntity {
	@Column({ unique: true })
	name: string

	@Column({ nullable: true, default: 0 })
	orderNum?: number

	@Column({ nullable: true, default: null })
	pId?: number

	@Column()
	remark?: string

	@Column()
	typeId: number

	@Column()
	value: string

	@Column({
		type: 'enum',
		enum: Status,
		default: Status.normal
	})
	status: Status
}

import { Entity, Column } from 'typeorm'
import { IEntity } from '@interfaces'
import { BaseEntity } from '@classes'

@Entity()
export class Dict extends BaseEntity implements IEntity {
	@Column({ unique: true })
	name: string

	@Column({ default: 0 })
	orderNum: number

	@Column({ nullable: true, default: null })
	pId: number

	@Column({ nullable: true, default: null })
	remark: string

	@Column()
	typeId: number

	@Column()
	value: string
}

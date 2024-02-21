import { Entity, Column } from 'typeorm'

import { BaseEntity } from '@classes'
import { IEntity } from '@interfaces'

import { Status } from '@shared/enums'
import { MenuCache, MenuHidden, MenuType } from './menu.type'

@Entity()
export class Menu extends BaseEntity implements IEntity {
	@Column({ default: '' })
	name: string

	@Column({
		type: 'simple-array',
		comment: '权限标识仅在type为权限时指定',
		default: null,
		nullable: true
	})
	perms?: string[]

	@Column({ nullable: true })
	pid?: number

	@Column({
		type: 'enum',
		enum: MenuType,
		default: MenuType.directory
	})
	type: MenuType

	@Column({ default: null, nullable: true })
	path?: string

	@Column({ default: null, nullable: true })
	component?: string

	@Column({ default: null, nullable: true })
	icon?: string

	@Column()
	sort: number

	@Column({
		type: 'enum',
		enum: MenuCache,
		default: MenuCache.on
	})
	cache: MenuCache

	@Column({
		type: 'enum',
		enum: MenuHidden,
		default: MenuHidden.on
	})
	hidden: MenuHidden

	@Column({
		type: 'enum',
		enum: Status,
		default: Status.normal
	})
	status: Status
}

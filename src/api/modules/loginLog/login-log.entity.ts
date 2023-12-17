import { Entity, Column } from 'typeorm'
import { BaseEntity } from '@classes'
import { IEntity } from '@interfaces'
import { LoginState } from './login-log.enum'

@Entity()
export class LoginLog extends BaseEntity implements IEntity {
	@Column({ length: 32 })
	ip: string

	@Column()
	userId: string

	@Column()
	username: string

	@Column({ type: 'boolean', default: false })
	isMobile: boolean

	@Column({ default: '' })
	message: string

	@Column({ default: '' })
	browser?: string

	@Column({ default: '' })
	os?: string

	@Column({
		type: 'enum',
		enum: LoginState,
		default: LoginState.success
	})
	loginState: LoginState

	@Column({ default: '' })
	idaddr?: string
}

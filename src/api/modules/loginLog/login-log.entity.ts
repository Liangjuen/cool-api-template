import { Entity, Column } from 'typeorm'
import { BaseEntity } from '@classes'
import { IEntity } from '@interfaces'
import { LoginState } from './login-log.enum'

@Entity()
export class LoginLog extends BaseEntity implements IEntity {
	@Column({ length: 32 })
	ip: string

	@Column({ nullable: true })
	userId: string

	@Column({ nullable: true })
	username: string

	@Column({ type: 'boolean', default: false })
	isMobile: boolean

	@Column({ default: '', nullable: true })
	message: string

	@Column({ default: '', nullable: true })
	browser: string

	@Column({ default: '', nullable: true })
	os: string

	@Column({
		type: 'enum',
		enum: LoginState,
		default: LoginState.success
	})
	loginState: LoginState

	@Column({ default: '', nullable: true })
	ipAddr: string
}

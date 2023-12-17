import { Entity, Column, BeforeInsert } from 'typeorm'
import bcrypt from 'bcrypt'
import { IEntity } from '@interfaces'
import { BaseEntity } from '@classes'
import { ROLE, Gender, Status } from '@shared/enums'

@Entity()
export class User extends BaseEntity implements IEntity {
	@Column({ unique: true })
	username: string

	@Column({ select: false })
	password: string

	@Column({ length: 128, unique: true })
	email: string

	@Column({ type: 'simple-array' })
	roles: Array<string>

	@Column({
		type: 'enum',
		enum: Status,
		default: Status.normal
	})
	status: Status

	@Column({
		type: 'enum',
		enum: Gender,
		default: Gender.x
	})
	gender: Gender

	@Column({ type: 'simple-array', default: null })
	tags?: Array<string>

	@Column({ default: '' })
	avatar?: string

	@Column({ default: '' })
	description?: string

	@BeforeInsert()
	setUserRole() {
		this.roles = [ROLE.Ghost]
	}

	/**
	 * @description 密码加密
	 */
	@BeforeInsert()
	async hashPassword(): Promise<void> {
		this.password = await bcrypt.hash(this.password, 10)
	}

	/**
	 * @description 检查未加密的密码是否有效
	 * @param unencryptedPassword 未加密的密码
	 * @returns boolean
	 */
	async passwordMatches(unencryptedPassword: string): Promise<boolean> {
		return await bcrypt.compare(unencryptedPassword, this.password)
	}
}

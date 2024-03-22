import { Entity, Column, BeforeInsert, Index } from 'typeorm'
import bcrypt from 'bcrypt'
import { IEntity } from '@interfaces'
import { BaseEntity } from '@classes'
import { ROLE, Gender, Status } from '@shared/enums'

@Entity()
export class User extends BaseEntity implements IEntity {
	@Index()
	@Column({ comment: '部门ID', nullable: true })
	departmentId: number

	@Column({ comment: '姓名', nullable: true })
	name: string

	@Index({ unique: true })
	@Column({ comment: '用户名', length: 100 })
	username: string

	@Column({ comment: '密码', select: false })
	password: string

	@Column({ comment: '昵称', nullable: true })
	nickName: string

	@Index()
	@Column({ comment: '邮箱', nullable: true })
	email: string

	@Index()
	@Column({ comment: '手机', nullable: true, length: 20 })
	phone: string

	@Column({
		comment: '角色code',
		type: 'simple-array'
	})
	roles: Array<string>

	@Column({
		comment: '状态',
		type: 'enum',
		enum: Status,
		default: Status.normal
	})
	status: Status

	@Column({
		comment: '性别',
		type: 'enum',
		enum: Gender,
		default: Gender.x
	})
	gender: Gender

	@Column({ comment: '标签', type: 'simple-array', nullable: true })
	tags: Array<string>

	@Column({ comment: '头像', nullable: true })
	avatar: string

	@Column({ comment: '备注', nullable: true })
	remark: string

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

import {
	Column,
	Entity,
	Index,
	OneToMany,
	PrimaryGeneratedColumn,
	CreateDateColumn,
} from 'typeorm'
import { UserMovie } from './UserMovie'

@Entity('users')
export class User {
	@PrimaryGeneratedColumn()
	id!: number

	@Index({ unique: true })
	@Column({ length: 50 })
	username!: string

	@Index({ unique: true })
	@Column({ length: 120 })
	email!: string

	@Column()
	passwordHash!: string

	@CreateDateColumn()
	createdAt!: Date

	@OneToMany(() => UserMovie, um => um.user)
	userMovies!: UserMovie[]
}

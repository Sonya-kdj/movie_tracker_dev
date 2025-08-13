import {
	Column,
	Entity,
	Index,
	OneToMany,
	PrimaryGeneratedColumn,
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

	@OneToMany(() => UserMovie, um => um.user)
	userMovies!: UserMovie[]

	
}

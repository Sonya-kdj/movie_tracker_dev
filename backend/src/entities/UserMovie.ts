import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	ManyToMany,
	PrimaryGeneratedColumn,
	Unique,
	UpdateDateColumn,
} from 'typeorm'
import { User } from './User'
import { Movie } from './Movie'
import { WatchStatus } from '../enums/WatchStatus'

@Entity('user_movies')
@Unique(['user', 'movie'])
export class UserMovie {
	@PrimaryGeneratedColumn()
	id!: number

	@ManyToMany(() => User, user => user.userMovies, { onDelete: 'CASCADE' })
	@Index()
	user!: User

	@ManyToMany(() => Movie, movie => movie.userMovies, { onDelete: 'CASCADE' })
	@Index()
	movie!: Movie

	@Column({ type: 'enum', enum: WatchStatus, default: WatchStatus.PLAN })
	status!: WatchStatus

	@Column({ type: 'int', nullable: true })
	rating!: number | null

	@CreateDateColumn()
	createdAt!: Date

	@UpdateDateColumn()
	updatedAt!: Date
}

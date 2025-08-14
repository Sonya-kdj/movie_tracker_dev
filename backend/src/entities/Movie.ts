import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import { UserMovie } from './UserMovie'

@Entity('movies')
export class Movie {
	@PrimaryGeneratedColumn()
	id!: number

	@Index({ unique: true })
	@Column({ type: 'int' })
	kpId!: number // id кинопоиска

	@Column({ length: 255 })
	title!: string

	@Column({ type: 'enum', enum: ['movie', 'serial'] })
	type!: 'movie' | 'serial'

	@Column({ type: 'int', nullable: true })
	year!: number | null

	@Column({ type: 'varchar', length: 1000, nullable: true })
	posterUrl!: string | null

	@Column({ type: 'text', nullable: true })
	description!: string | null

	@OneToMany(() => UserMovie, um => um.movie)
	userMovies!: UserMovie[]

	@CreateDateColumn()
	createdAt!: Date

	@UpdateDateColumn()
	updatedAt!: Date
}

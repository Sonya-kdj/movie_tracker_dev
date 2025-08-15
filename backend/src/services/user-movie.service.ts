import { AppDataSource } from '../config/data-source'
import { UserMovie } from '../entities/UserMovie'
import { Movie } from '../entities/Movie'
import { User } from '../entities/User'
import { WatchStatus } from '../enums/WatchStatus'

const umRepo = () => AppDataSource.getRepository(UserMovie)
const movieRepo = () => AppDataSource.getRepository(Movie)
const userRepo = () => AppDataSource.getRepository(User)

export const UserMovieService = {
	async list(userId: number, { skip, limit }: { skip: number; limit: number }) {
		const [items, total] = await umRepo().findAndCount({
			where: { user: { id: userId } },
			relations: ['movie'],
			order: { updatedAt: 'DESC' },
			skip,
			take: limit,
		})
		return { items, total }
	},

	async add(
		userId: number,
		m: {
			kpId: number
			type: 'movie' | 'serial'
			title?: string
			year?: number
			posterUrl?: string
			description?: string
			status?: WatchStatus
			rating?: number | null
		}
	) {
		const user = await userRepo().findOneByOrFail({ id: userId })
		let movie = await movieRepo().findOne({ where: { kpId: m.kpId } })
		if (!movie) {
			movie = movieRepo().create({
				kpId: m.kpId,
				type: m.type,
				title: m.title || '',
				year: m.year ?? null,
				posterUrl: m.posterUrl ?? null,
				description: m.description ?? null,
			})
			await movieRepo().save(movie)
		}

		const exist = await umRepo().findOne({
			where: { user: { id: userId }, movie: { id: movie.id } },
		})
		if (exist) throw { status: 409, message: 'Already in list' }

		const record = umRepo().create({
			user,
			movie,
			status: m.status || WatchStatus.PLAN,
			rating: m.rating ?? null,
		})
		await umRepo().save(record)
		return record
	},

	async update(
		userId: number,
		id: number,
		patch: { status?: WatchStatus; rating?: number | null }
	) {
		const item = await umRepo().findOne({
			where: { id },
			relations: ['user', 'movie'],
		})
		if (!item || item.user.id !== userId)
			throw { status: 404, message: 'Item not found' }
		if (typeof patch.status !== 'undefined') item.status = patch.status
		if (typeof patch.rating !== 'undefined') item.rating = patch.rating
		await umRepo().save(item)
		return item
	},

	async remove(userId: number, id: number) {
		const item = await umRepo().findOne({ where: { id }, relations: ['user'] })
		if (!item || item.user.id !== userId)
			throw { status: 404, message: 'Item not found' }
		await umRepo().remove(item)
		return { success: true }
	},
}

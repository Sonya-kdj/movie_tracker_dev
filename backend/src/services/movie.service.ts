import axios from 'axios'
import { AppDataSource } from '../config/data-source'
import { env } from '../config/env'
import { Movie } from '../entities/Movie'

const movieRepo = () => AppDataSource.getRepository(Movie)

export const MovieService = {
	async ensureMovieByKp(kpId: number, payload?: Partial<Movie>) {
		let movie = await movieRepo().findOne({ where: { kpId } })
		if (!movie) {
			movie = movieRepo().create({ kpId, ...payload })
			await movieRepo().save(movie)
		}
		return movie
	},

	async getById(id: number) {
		const movie = await movieRepo().findOne({ where: { id } })
		if (!movie) throw { status: 404, message: 'Movie not found' }
		return movie
	},

	async search(query: string, page = 1) {
		const url = `${
			env.KINOPOISK.BASE_URL
		}/api/v2.1/films/search-by-keyword?keyword=${encodeURIComponent(
			query
		)}&page=${page}`
		const { data } = await axios.get(url, {
			headers: {
				'X-API-KEY': env.KINOPOISK.API_KEY,
				'Content-Type': 'application/json',
			},
		})
		return data
	},

	async details(kpId: number) {
		const url = `${env.KINOPOISK.BASE_URL}/api/v2.2/films/${kpId}`
		const { data } = await axios.get(url, {
			headers: {
				'X-API-KEY': env.KINOPOISK.API_KEY,
				'Content-Type': 'application/json',
			},
		})
		return data
	},
}

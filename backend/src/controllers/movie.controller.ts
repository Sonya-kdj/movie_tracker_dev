import { Request, Response, NextFunction } from 'express'

import { MovieService } from '../services/movie.service'

export const MovieController = {
	async search(req: Request, res: Response, next: NextFunction) {
		try {
			const { q = '', page = '1' } = req.query as any
			const data = await MovieService.search(String(q), Number(page))
			res.json(data)
		} catch (e) {
			next(e)
		}
	},
	async details(req: Request, res: Response, next: NextFunction) {
		try {
			const kpId = Number(req.params.kpId)
			const data = await MovieService.details(kpId)
			res.json(data)
		} catch (e) {
			next(e)
		}
	},
}

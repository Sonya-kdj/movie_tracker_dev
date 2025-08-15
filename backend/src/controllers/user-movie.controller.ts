import { Request, Response, NextFunction } from 'express'
import { UserMovieService } from '../services/user-movie.service'
import { parsePagination } from '../utils/pagination'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { AddUserMovieDto, UpdateUserMovieDto } from '../dtos/user-movie.dto'

export const UserMovieController = {
	async list(
		req: Request & { userId?: number },
		res: Response,
		next: NextFunction
	) {
		try {
			const { limit, skip, page } = { ...parsePagination(req.query) }
			const data = await UserMovieService.list(req.userId!, { skip, limit })
			res.json({ page, limit, total: data.total, items: data.items })
		} catch (e) {
			next(e)
		}
	},

	async add(
		req: Request & { userId?: number },
		res: Response,
		next: NextFunction
	) {
		try {
			const dto = plainToInstance(AddUserMovieDto, req.body)
			const errors = await validate(dto, {
				whitelist: true,
				forbidNonWhitelisted: true,
			})
			if (errors.length)
				return res.status(400).json({ message: 'Validation error', errors })

			const item = await UserMovieService.add(req.userId!, {
				kpId: dto.kpId,
				type: dto.type,
				title: dto.title,
				year: dto.year,
				posterUrl: dto.posterUrl,
				description: dto.description,
				status: dto.status,
				rating: dto.rating,
			})
			res.status(201).json(item)
		} catch (e) {
			next(e)
		}
	},

	async update(
		req: Request & { userId?: number },
		res: Response,
		next: NextFunction
	) {
		try {
			const id = Number(req.params.id)
			const dto = plainToInstance(UpdateUserMovieDto, req.body)
			const errors = await validate(dto, {
				whitelist: true,
				forbidNonWhitelisted: true,
			})
			if (errors.length)
				return res.status(400).json({ message: 'Validation error', errors })

			const updated = await UserMovieService.update(req.userId!, id, {
				status: dto.status,
				rating: dto.rating ?? null,
			})
			res.json(updated)
		} catch (e) {
			next(e)
		}
	},

	async remove(
		req: Request & { userId?: number },
		res: Response,
		next: NextFunction
	) {
		try {
			const id = Number(req.params.id)
			const result = await UserMovieService.remove(req.userId!, id)
			res.json(result)
		} catch (e) {
			next(e)
		}
	},
}

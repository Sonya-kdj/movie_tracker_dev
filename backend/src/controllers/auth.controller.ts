import { plainToInstance } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'
import { LoginDto, RegisterDto } from '../dtos/auth.dto'
import { validate } from 'class-validator'
import { AuthService } from '../services/auth.service'

// кастомный тип запроса с userId
interface AuthenticatedRequest extends Request {
	userId?: number
}

export const AuthController = {
	async register(req: Request, res: Response, next: NextFunction) {
		try {
			const dto = plainToInstance(RegisterDto, req.body)
			const errors = await validate(dto, { whitelist: true })

			if (errors.length) {
				return res.status(400).json({ message: 'Validation error', errors })
			}

			const result = await AuthService.register(
				dto.username,
				dto.email,
				dto.password
			)
			res.status(201).json(result)
		} catch (e) {
			next(e)
		}
	},

	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const dto = plainToInstance(LoginDto, req.body)
			const errors = await validate(dto, { whitelist: true })

			if (errors.length) {
				return res.status(400).json({ message: 'Validation error', errors })
			}

			const result = await AuthService.login(dto.email, dto.password)
			res.json(result)
		} catch (e) {
			next(e)
		}
	},

	async me(req: AuthenticatedRequest, res: Response, next: NextFunction) {
		try {
			if (!req.userId) {
				return res.status(401).json({ message: 'Unauthorized' })
			}

			const result = await AuthService.me(req.userId)
			res.json(result)
		} catch (e) {
			next(e)
		}
	},
}

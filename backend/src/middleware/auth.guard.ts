import { Request, Response, NextFunction } from 'express'
import { verifyJwt } from '../utils/jwt'

export function authGuard(
	req: Request & { userId?: number },
	res: Response,
	next: NextFunction
) {
	const auth = req.headers.authorization
	if (!auth?.startsWith('Bearer'))
		return res.status(401).json({ message: 'Unauthorized' })
	try {
		const token = auth.slice(7)
		const payload = verifyJwt(token)
		req.userId = payload.sub
		next()
	} catch {
		return res.status(401).json({ message: 'Invalid token' })
	}
}

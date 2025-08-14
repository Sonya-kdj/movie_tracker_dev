import jwt, { SignOptions } from 'jsonwebtoken'
import { env } from '../config/env'

export type JwtPayload = { sub: number; email: string }

const signOptions: SignOptions = {
	expiresIn: env.AUTH.JWT_EXPIRES as unknown as jwt.SignOptions['expiresIn'],
}

export function signJwt(payload: JwtPayload): string {
	return jwt.sign(payload as object, env.AUTH.JWT_SECRET, signOptions)
}

export function verifyJwt(token: string): JwtPayload {
	const decoded = jwt.verify(token, env.AUTH.JWT_SECRET) as unknown
	return decoded as JwtPayload
}

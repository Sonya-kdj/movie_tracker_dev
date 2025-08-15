import { AppDataSource } from '../config/data-source'
import { User } from '../entities/User'
import { env } from '../config/env'
import * as bcrypt from 'bcryptjs'
import { signJwt } from '../utils/jwt'

const userRepo = () => AppDataSource.getRepository(User)

export const AuthService = {
	async register(username: string, email: string, password: string) {
		const exists = await userRepo().findOne({
			where: [{ email }, { username }],
		})
		if (exists)
			throw { status: 409, message: 'user with same email or username exists' }

		const passwordHash = await bcrypt.hash(
			password,
			Number(env.AUTH.BCRYPT_SALT)
		)
		const user = userRepo().create({ username, email, passwordHash })
		await userRepo().save(user)
		const token = signJwt({ sub: user.id, email: user.email })
		return {
			user: { id: user.id, username: user.username, email: user.email },
			token,
		}
	},

	async login(email: string, password: string) {
		const user = await userRepo().findOne({ where: { email } })
		if (!user) throw { status: 401, message: 'Invalid credential' }

		const ok = await bcrypt.compare(password, user.passwordHash)
		if (!ok) throw { status: 401, message: 'Invalid credentials' }

		const token = signJwt({ sub: user.id, email: user.email })
		return {
			user: { id: user.id, username: user.username, email: user.email },
			token,
		}
	},

	async me(userId: number) {
		const user = await userRepo().findOne({ where: { id: userId } })
		if (!user) throw { status: 404, message: 'user not found' }
		return {
			id: user.id,
			username: user.username,
			email: user.email,
			createdAt: user.createdAt,
		}
	},
}

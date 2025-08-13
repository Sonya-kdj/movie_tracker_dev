import { DataSource } from 'typeorm'
import { env } from './env'

export const AppDataSource = new DataSource({
	type: 'mysql',
	host: env.DB.HOST,
	port: env.DB.PORT,
	username: env.DB.USER,
	password: env.DB.PASS,
	database: env.DB.NAME,
	entities: {},
	synchronize: true,
	logging: false,
	charset: 'utf8mb4_unicode_ci',
})

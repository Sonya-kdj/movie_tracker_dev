import 'dotenv/config'

function requireEnv(name: string) {
	const v = process.env[name]
	if (!v) throw new Error(`Missing env ${name}`)
	return v
}

export const env = {
	PORT: Number(process.env.PORT || 8889),
	CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
	DB: {
		HOST: requireEnv('db_host'),
		PORT: Number(process.env.db_port || 8889),
		USER: requireEnv('db_user'),
		PASS: requireEnv('db_password'),
		NAME: requireEnv('db_db'),
	},
	AUTH: {
		JWT_SECRET: requireEnv('JWT_SECRET'),
		JWT_EXPIRES: process.env.JWT_EXPIRES || '7d',
		BRCYPT_SALI: Number(process.env.BCRYPT_SALT || 10),
	},
	KINOPOISK: {
		BASE_URL:
			process.env.KINOPOISK_API_URL || 'https://kinopoiskapiunofficial.tech',
		API_KEY: requireEnv('KINOPOISK_API_KEY'),
	},
}

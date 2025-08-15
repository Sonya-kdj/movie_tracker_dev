import { env } from './config/env'
import { app } from './app'
import { AppDataSource } from './config/data-source'

async function bootstrap() {
	await AppDataSource.initialize()
	app.listen(env.PORT, () => {
		console.log(`api running on http://localhost:${env.PORT}`)
	})
}

bootstrap().catch(e => {
	console.error('failed to start', e)
	process.exit(1)
})

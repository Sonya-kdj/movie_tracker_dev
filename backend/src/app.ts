import express from 'express'
import cors from 'cors'
import { env } from 'process'
import authRoutes from '../src/routes/auth.routes'
import movieRoutes from '../src/routes/movie.routes'
import userMovieRoutes from '../src/routes/user-movie.routes'
import { errorHandler } from './middleware/error.handler'

export const app = express()

app.use(cors({ origin: env.CORS_ORIGIN, credentials: false }))
app.use(express.json({ limit: '1mb' }))

app.use('/api/auth', authRoutes)
app.use('/api/movies', movieRoutes)
app.use('/api/user/movie', userMovieRoutes)

app.use(errorHandler)

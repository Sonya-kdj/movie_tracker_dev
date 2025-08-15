import { Router } from 'express'
import { authGuard } from '../middleware/auth.guard'
import { UserMovieController } from '../controllers/user-movie.controller'

const router = Router()

router.get('/', authGuard, UserMovieController.list)
router.post('/', authGuard, UserMovieController.add)
router.put('/:id', authGuard, UserMovieController.update)
router.delete('/:id', authGuard, UserMovieController.remove)

export default router

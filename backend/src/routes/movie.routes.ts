import { Router } from 'express'
import { MovieController } from '../controllers/movie.controller'

const router = Router()

router.get('/search', MovieController.search)
router.get('/:kpId', MovieController.details)

export default router

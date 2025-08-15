import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'
import { authGuard } from '../middleware/auth.guard'

const router = Router()

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.get('/me', authGuard, AuthController.me)

export default router

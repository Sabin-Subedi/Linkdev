import express from 'express'
import {
  authUser,
  registerUser,
  verifyEmail,
  verifyUser,
} from '../controllers/authControllers.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/login').post(authUser)
router.route('/register').post(registerUser)

router.get('/verifyEmail', protect, verifyEmail)

router.get('/verifyuser/:token', verifyUser)

export default router

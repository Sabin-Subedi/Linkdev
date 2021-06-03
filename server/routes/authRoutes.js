import express from 'express'
import {
  authUser,
  forgetPassword,
  registerUser,
  resetPassword,
  tokenVerify,
  verifyEmail,
  verifyUser,
} from '../controllers/authControllers.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/login').post(authUser)
router.route('/register').post(registerUser)

router.get('/verifyEmail', protect, verifyEmail)
router.get('/tokenVerify/:token', tokenVerify)

router.post('/forgotPassword', forgetPassword)
router.post('/resetPassword/:token', resetPassword)

router.get('/verifyuser/:token', verifyUser)

export default router

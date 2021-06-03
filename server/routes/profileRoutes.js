import express from 'express'
import {
  getProfileById,
  updateProfile,
} from '../controllers/profileController.js'
import { getUsers, updateUserAvatar } from '../controllers/userControllers.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.get('/profile/:id', protect, getProfileById)
router.put('/profile', protect, updateProfile)

router.put('/profile/avatar', protect, updateUserAvatar)

router.get('/users', protect, getUsers)

export default router

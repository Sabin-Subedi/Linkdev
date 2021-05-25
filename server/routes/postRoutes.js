import express from 'express'
import {
  createPosts,
  getPostByUser,
  getPosts,
  likePosts,
} from '../controllers/postController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/posts').get(protect, getPosts).post(protect, createPosts)
router.get('/post/like/:id', protect, likePosts)
router.get('/posts/:id', protect, getPostByUser)

export default router

import express from 'express'
import {
  commentPosts,
  createPosts,
  deletePostById,
  getPostById,
  getPostByUser,
  getPosts,
  likePosts,
} from '../controllers/postController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/posts').get(protect, getPosts).post(protect, createPosts)
router.get('/post/like/:id', protect, likePosts)
router.put('/post/comment/:id', protect, commentPosts)
router.get('/posts/:id', protect, getPostByUser)

router.get('/post/:id', protect, getPostById)

router.delete('/post/:id', protect, deletePostById)

export default router

import Post from '../models/postModels.js'

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 })

    return res.status(200).json(posts)
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message, stack: err.stack })
  }
}

export const createPosts = async (req, res) => {
  try {
    const { text, postImage } = req.body

    const post = await Post.create({
      user: req.user._id,
      name: req.user.name,
      avatar: req.user.avatar,
      text,
      postImage,
    })

    if (post) {
      return res.status(200).json(post)
    }

    res.status(400).json({ message: 'Couldnot Create a Post' })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message, stack: err.stack })
  }
}

export const likePosts = async (req, res) => {
  try {
    const id = req.params.id

    const post = await Post.findById(id)

    const alreadyLiked = post.likes.find(
      (r) => r.user.toString() === req.user.id.toString()
    )

    if (post && alreadyLiked) {
      post.likes.splice(post.likes.indexOf(alreadyLiked))

      const updatedPost = await post.save()
      return res.status(201).json(updatedPost)
    } else if (post && !alreadyLiked) {
      post.likes.push({ user: req.user.id })

      const updatedPost = await post.save()
      return res.status(201).json(updatedPost)
    } else {
      return res.status(400).json({ message: "Post Doesn't Exist" })
    }
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack })
  }
}

export const getPostByUser = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.id }).sort({
      createdAt: -1,
    })

    res.status(200).json(posts)
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack })
  }
}

export const commentPosts = async (req, res) => {
  try {
    const id = req.params.id
    const { text } = req.body

    const post = await Post.findById(id)

    if (post) {
      const newComment = {
        commentText: text,
        user: req.user.id,
        name: req.user.name,
        avatar: req.user.avatar,
      }

      post.comments.push(newComment)

      post.save()

      return res.status(201).json({
        message: 'Succesfully Commented',
        newComment: newComment,
      })
    }

    res.status(400).json({ message: 'Post not Found' })
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack })
  }
}

export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id
    const post = await Post.findById(postId)

    if (!post) {
      return res.status(400).json({ message: 'Post Not Found' })
    }

    res.status(200).json(post)
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message, stack: err.stack })
  }
}

export const deletePostById = async (req, res) => {
  try {
    const postId = req.params.id
    const post = await Post.findById(postId)

    if (!post) {
      return res.status(400).json({ message: 'Post Not Found' })
    }

    if (post.user.toString() === req.user.id.toString()) {
      post.delete()

      return res.status(201).json('Post Succesfully Deleted')
    }

    res.status(400).json({ message: "The post doesn't belongs to you " })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message, stack: err.stack })
  }
}

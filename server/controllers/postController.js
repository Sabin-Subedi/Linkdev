import Post from '../models/postModels.js'

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 })

    res.status(200).json(posts)
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack })
  }
}

export const createPosts = async (req, res) => {
  try {
    const { text, postImage } = req.body

    const post = new Post({
      user: req.user._id,
      name: req.user.name,
      avatar: req.user.avatar,
      text,
      postImage,
    })

    const createdPost = await post.save()

    console.log(createdPost)

    if (createdPost) {
      return res.status(200).json(createdPost)
    }

    res.status(400).json({ message: 'Couldnot Create a Post' })
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack })
  }
}

export const likePosts = async (req, res) => {
  try {
    const id = req.params.id

    const post = await Post.findById(id)
    // console.log(post)

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

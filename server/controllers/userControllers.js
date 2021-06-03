import Post from '../models/postModels.js'
import Profile from '../models/profileModels.js'
import User from '../models/userModels.js'

export const updateUserAvatar = async (req, res) => {
  try {
    const { avatar } = req.body

    const user = await User.findById(req.user.id)

    if (user) {
      user.avatar = avatar

      await Post.updateMany({ user: req.user.id }, { $set: { avatar: avatar } })
      await Post.updateMany(
        { 'comments.user': req.user.id },
        { $set: { 'comments.$[item].avatar': avatar } },
        {
          arrayFilters: [
            {
              'item.user': req.user.id,
            },
          ],
        }
      )

      const post = await Post.find({ user: req.user.id }).sort({
        createdAt: -1,
      })

      const newUser = await user.save()

      const profile = await Profile.findOne({ user: newUser.id }).populate(
        'user',
        'avatar isVerified name email'
      )

      return res.status(201).json({ avatar: newUser.avatar, profile, post })
    }

    res
      .status(400)
      .json({ message: `There was some error Updating the avatar` })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message, stack: err.stack })
  }
}

export const getUsers = async (req, res) => {
  try {
    const users = await User.find()

    return res.status(200).json(users)
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack })
  }
}

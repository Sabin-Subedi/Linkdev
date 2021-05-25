import Profile from '../models/profileModels.js'

export const createProfile = async (req, res) => {}

export const updateProfile = async (req, res) => {
  try {
    const { socialLinks, bio, skills, location, website } = req.body

    const profile = new Profile({
      user: req.user._id,
      socialLinks,
      bio,
      skills,
      location,
      website,
    })

    const updatedPorfile = await profile.save()

    if (updateProfile) {
      return res.status(200).json(updateProfile)
    }

    res.status(400).json({ message: 'Couldnot UpdateProfile' })
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack })
  }
}

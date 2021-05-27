import Profile from '../models/profileModels.js'

export const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.id }).populate(
      'user',
      'name email avatar isVerified'
    )

    if (profile) {
      return res.status(201).json(profile)
    }

    res
      .status(400)
      .json({ message: `Couldn't Find the Porfile with the given Id` })
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const {
      facebook,
      instagram,
      twitter,
      github,
      linkedin,
      bio,
      skills,
      location,
      website,
    } = req.body

    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      'name email isVerified avatar'
    )

    if (profile) {
      profile.facebook = facebook
      profile.instagram = instagram
      profile.twitter = twitter
      profile.linkedin = linkedin
      profile.github = github
      profile.bio = bio
      profile.skills = skills
      profile.location = location
      profile.website = website

      await profile.save()

      return res.status(201).json(profile)
    }

    res.status(400).json({ message: 'Couldnot UpdateProfile' })
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack })
  }
}

import mongoose from 'mongoose'

const profileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    facebook: {
      type: String,
    },
    github: {
      type: String,
    },
    twitter: {
      type: String,
    },
    instagram: {
      type: String,
    },
    linkedin: {
      type: String,
    },

    followers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
    website: {
      type: String,
    },
    location: {
      type: String,
    },
    skills: {
      type: [String],
    },
    bio: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const Profile = mongoose.model('Profile', profileSchema)

export default Profile

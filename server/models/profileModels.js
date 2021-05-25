import mongoose from 'mongoose'

const profileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaType.ObjectId,
      required: true,
      ref: 'User',
    },
    socialLinks: [
      {
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
      },
    ],
    followers: [
      {
        user: {
          type: mongoose.SchemaType.ObjectId,
          required: true,
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
      required: true,
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

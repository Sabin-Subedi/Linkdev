import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: [8, 'Your Password must be 8 digit'],
    },
    avatar: {
      type: String,
      default: `https://storage.googleapis.com/hello-de203.appspot.com/image-1622783412476.jpg`,
    },
    date: {
      type: Date,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
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

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User

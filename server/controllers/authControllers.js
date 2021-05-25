import jwt from 'jsonwebtoken'
import User from '../models/userModels.js'
import bcrypt from 'bcryptjs'
import { sendEmail } from '../utils/email.js'

// ! @route POST /v1/auth/login
// ? @desc Login User
// * @acess Public
export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user) {
      const matchPassword = await bcrypt.compare(password, user.password)

      if (matchPassword) {
        return res.status(200).json({
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          isVerified: user.isVerified,
          token: jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1m',
          }),
        })
      } else {
        return res.status(400).json({ message: 'Invalid Email or Password' })
      }
    }

    res.status(400).json({ message: 'Invalid Email or Password' })
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack })
  }
}

// ! @route POST /v1/auth/register
// ? @desc Register
// * @acess Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, date } = req.body

    const user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({ message: 'User Already Exists' })
    }

    const newUser = await User.create({
      name,
      email,
      password,
      date,
    })

    if (newUser) {
      res.status(201).json({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        date: newUser.date,
        avatar: newUser.avatar,
        isVerified: newUser.isVerified,
        token: jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
          expiresIn: '30d',
        }),
      })
    } else {
      res.status(400).json({ message: 'Invalid User Data' })
    }
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack })
  }
}

export const verifyToken = async (req, res) => {
  try {
    const { token } = req.body

    const { email } = jwt.decode(token)

    const user = await User.findOne({ email })

    if (user) {
      user.isVerified = true

      user.save()

      res.status(201).json({ message: 'Your account is now verified' })
    }

    res.satus(400).json({ message: 'Verification Error' })
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack })
  }
}

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body

    const user = await User.findOne({ email })

    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '12h',
      })

      const URI = `https://localhost:3000/resetpassword?${token}`

      await sendEmail(email, URI, subject, htmlType)

      res.status(201).json({ message: 'Verification Link Sent to your email' })
    }

    res.satus(400).json({ message: 'User not Found with that email address' })
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack })
  }
}

// ! @route GET /v1/auth/verifyEmail
// ? @desc Send Verification Link to email
// * @acess Public
export const verifyEmail = async (req, res) => {
  try {
    const { email } = req.user

    const user = await User.findOne({ email })

    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '12h',
      })

      const URI = `http://localhost:5000/v1/auth/verifyuser/${token}`
      const subject = 'VERIFY YOUR EMAIL ADDRESS'
      const name = user.name

      try {
        sendEmail(email, URI, subject, name)

        return res
          .status(201)
          .json({ message: 'Verification Link Sent to your email' })
      } catch (err) {
        console.log(err)
        return res.status(400).json({ message: err.message, stack: err.stack })
      }
    }

    res.status(400).json({ message: 'User not Found with that email address' })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message, stack: err.stack })
  }
}

// ! @route GET /v1/auth/verifyuser?token
// ? @desc verify user
// * @acess Public

export const verifyUser = async (req, res) => {
  try {
    const token = req.params.token

    const data = jwt.decode(token)

    const user = await User.findById(data.id)

    if (user) {
      user.isVerified = true

      user.save()

      return res.redirect('http://localhost:3000/verified?verified')
    }

    return res.redirect(`http://localhost:3000/verified?notverified`)
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack })
  }
}

import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import postRoutes from './routes/postRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import path from 'path'

dotenv.config()

// ! Connects DataBase
connectDB()

const app = express()

// app.use(cors('*'))

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Server Runnning' })
})

app.use('/v1/auth/', authRoutes)
app.use('/v1/', postRoutes)
app.use('/v1/upload', uploadRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

const PORT = process.env.PORT

app.listen(PORT, () => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`SERVER IS RUNNING ON PORT https://localhost:${PORT}`)
  }
})

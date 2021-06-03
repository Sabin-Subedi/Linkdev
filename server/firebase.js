import admin from 'firebase-admin'
import config from './config.js'
import devConfig from './config_dev.js'
import dotenv from 'dotenv'

dotenv.config()

const app = admin.initializeApp({
  credential: admin.credential.cert(
    process.env.NODE_ENV === 'development' ? devConfig : config
  ),
  storageBucket:
    process.env.NODE_ENV === 'development'
      ? `gs://linkdevdevelopment.appspot.com`
      : `gs://hello-de203.appspot.com`,
})

const bucket = app.storage().bucket()

export { bucket }

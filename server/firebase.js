import admin from 'firebase-admin'
import config from './config.js'
import dotenv from 'dotenv'

dotenv.config()

// process.env.NODE_ENV === 'development' ? devConfig : config
// process.env.NODE_ENV === 'development'
//       ? `gs://linkdevdevelopment.appspot.com`
//       :

const app = admin.initializeApp({
  credential: admin.credential.cert(config),
  storageBucket: `gs://hello-de203.appspot.com`,
})

const bucket = app.storage().bucket()

export { bucket }

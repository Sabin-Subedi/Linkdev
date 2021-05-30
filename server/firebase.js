import admin from 'firebase-admin'
import config from './config.js'

const app = admin.initializeApp({
  credential: admin.credential.cert(config),
  storageBucket: 'gs://hello-de203.appspot.com',
})

const bucket = app.storage().bucket()

export { bucket }

import { logErrServer, logServer } from '@expresso/helpers/Formatter'
import mongoose from 'mongoose'
import {
  MONGODB_AUTH,
  MONGODB_DATABASE,
  MONGODB_HOST,
  MONGODB_PASSWORD,
  MONGODB_PORT,
  MONGODB_USERNAME,
} from './env'

const setUri = `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`
const setOptions = {
  user: MONGODB_USERNAME,
  pass: MONGODB_PASSWORD,
  authSource: MONGODB_AUTH,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}

const initialMongoDB = (): void => {
  const msgTye = 'mongodb'

  // Connecting to the database
  mongoose
    .connect(setUri, setOptions)
    .then(() => {
      const message = `Successfully connected to the database : ${MONGODB_DATABASE}`
      console.log(logServer(msgTye, message))
    })
    .catch((err) => {
      const message = `Could not connect to the MongoDB database : ${MONGODB_DATABASE}`
      console.log(logErrServer(msgTye, message), err)

      process.exit()
    })
}

export default initialMongoDB

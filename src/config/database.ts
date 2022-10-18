import { logErrServer, logServer } from '@expresso/helpers/Formatter'
import chalk from 'chalk'
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
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const initialMongoDB = (): void => {
  const msgTye = 'mongodb'
  const dbName = chalk.cyan(MONGODB_DATABASE)

  // Connecting to the database
  mongoose
    .connect(setUri, setOptions)
    .then(() => {
      const message = `Successfully connected to the database : ${dbName}`
      console.log(logServer(msgTye, message))
    })
    .catch((err) => {
      const message = `Could not connect to the MongoDB database : ${dbName}`
      console.log(logErrServer(msgTye, message), err)

      process.exit()
    })
}

export default initialMongoDB
